import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Edges, Environment, Grid, Lightformer, MeshReflectorMaterial, RoundedBox } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { HERO_CANDLES, type HeroCandle } from './heroData'
import type { Tier } from './useGraphicsTier'

const STEP = 0.82
const BODY_W = 0.5
const MIN_BODY = 0.42

const PALETTE = {
  bull: { glass: '#07402a', core: '#00c878', rim: '#6dffc4', atten: '#00e58a', wick: '#3dffb0' },
  bear: { glass: '#4f0b15', core: '#e02438', rim: '#ff8a8a', atten: '#f04444', wick: '#ff6464' },
} as const

function Candle({ data, i, tier, reduceMotion, count }: { data: HeroCandle; i: number; tier: Tier; reduceMotion: boolean; count: number }) {
  const group = useRef<THREE.Group>(null)
  const bull = data.c >= data.o
  const p = bull ? PALETTE.bull : PALETTE.bear
  const bodyH = Math.max(Math.abs(data.c - data.o), MIN_BODY)
  const yMid = (data.o + data.c) / 2
  const upperLen = Math.max(data.h - Math.max(data.o, data.c), 0.08)
  const lowerLen = Math.max(Math.min(data.o, data.c) - data.l, 0.08)
  const x = (i - (count - 1) / 2) * STEP
  const high = tier === 'high'

  // Material built once per candle colour; "dark, almost opaque" glass: low transmission, strong clearcoat.
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: p.glass,
        metalness: 0.15,
        roughness: 0.07,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        ior: 1.52,
        reflectivity: 0.7,
        envMapIntensity: high ? 2.4 : 1.6,
        transmission: high ? 0.3 : 0,
        thickness: 1.4,
        attenuationColor: new THREE.Color(p.atten),
        attenuationDistance: 0.9,
        emissive: new THREE.Color(p.core),
        emissiveIntensity: 0.16,
      }),
    [p, high],
  )
  const core = useMemo(() => new THREE.MeshStandardMaterial({ color: p.core, emissive: new THREE.Color(p.core), emissiveIntensity: 0.95, roughness: 0.35, metalness: 0.1 }), [p])
  const wick = useMemo(() => new THREE.MeshStandardMaterial({ color: p.wick, emissive: new THREE.Color(p.wick), emissiveIntensity: 0.7, roughness: 0.15, metalness: 0.2 }), [p])
  useEffect(() => () => { glass.dispose(); core.dispose(); wick.dispose() }, [glass, core, wick])

  // Rise-in on mount, then a very slow float; last two candles "breathe" like a live bar.
  const born = useRef<number | null>(null)
  useFrame((s) => {
    const g = group.current
    if (!g) return
    if (born.current === null) born.current = s.clock.elapsedTime
    const t = s.clock.elapsedTime - born.current - i * 0.07
    const k = reduceMotion ? 1 : Math.min(Math.max(t / 1.1, 0), 1)
    const e = 1 - Math.pow(1 - k, 4)
    g.scale.set(1, Math.max(e, 0.001), 1)
    g.position.y = reduceMotion ? 0 : Math.sin(s.clock.elapsedTime * 0.5 + i * 0.9) * 0.035
    if (!reduceMotion && i >= count - 2) {
      const br = 1 + Math.sin(s.clock.elapsedTime * 1.3 + i) * 0.018
      g.scale.y *= br
    }
  })

  return (
    <group ref={group} position={[x, 0, 0]}>
      <mesh position={[0, yMid + bodyH / 2 + upperLen / 2, 0]} material={wick}>
        <cylinderGeometry args={[0.028, 0.028, upperLen, 10]} />
      </mesh>
      <mesh position={[0, yMid - bodyH / 2 - lowerLen / 2, 0]} material={wick}>
        <cylinderGeometry args={[0.028, 0.028, lowerLen, 10]} />
      </mesh>
      {/* inner luminous core, visible through the dark glass */}
      <RoundedBox args={[BODY_W * 0.62, bodyH * 0.86, BODY_W * 0.62]} radius={0.04} smoothness={2} position={[0, yMid, 0]} material={core} />
      {/* outer bevelled glass shell */}
      <RoundedBox args={[BODY_W, bodyH, BODY_W]} radius={0.075} smoothness={high ? 5 : 3} position={[0, yMid, 0]} material={glass} castShadow={high}>
        <Edges threshold={28} color={p.rim} scale={1.001} />
      </RoundedBox>
    </group>
  )
}

/** Camera: slow pointer parallax + optional view offset to push the composition to the right of the headline. */
function Rig({ shift, reduceMotion }: { shift: number; reduceMotion: boolean }) {
  const { camera, size, pointer } = useThree()
  const target = useRef(new THREE.Vector3(0, 2.7, 0))
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    cam.setViewOffset(size.width, size.height, -size.width * shift, 0, size.width, size.height)
    return () => cam.clearViewOffset()
  }, [camera, size.width, size.height, shift])
  useFrame(() => {
    if (reduceMotion) { camera.position.set(-2.6, 2.7, 10.2); camera.lookAt(target.current); return }
    const tx = -2.6 + pointer.x * 0.9
    const ty = 2.7 + pointer.y * 0.35
    camera.position.x += (tx - camera.position.x) * 0.04
    camera.position.y += (ty - camera.position.y) * 0.04
    camera.lookAt(target.current)
  })
  return null
}

function Studio({ tier, reduceMotion }: { tier: Tier; reduceMotion: boolean }) {
  const high = tier === 'high'
  return (
    <>
      <color attach="background" args={['#070A0D']} />
      <fog attach="fog" args={['#070A0D', 12, 30]} />
      <ambientLight intensity={0.25} />
      {/* key light with warm tint (reference image 2) and cool rim */}
      <spotLight position={[-6, 9, 6]} angle={0.5} penumbra={1} intensity={high ? 220 : 160} color="#ffe3b8" castShadow={high} shadow-mapSize={[1024, 1024]} />
      <pointLight position={[7, 3, 4]} intensity={40} color="#8fb4d9" />
      {/* self-contained studio environment — no network HDRI */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.6} position={[-5, 6, 4]} scale={[8, 2, 1]} color="#fff2dc" />
        <Lightformer form="rect" intensity={1.6} position={[6, 2, 5]} scale={[2, 8, 1]} color="#b9d4ff" />
        <Lightformer form="ring" intensity={1.2} position={[0, 7, -4]} scale={6} color="#ffffff" />
        <Lightformer form="rect" intensity={0.8} position={[0, -2, 6]} scale={[14, 1, 1]} color="#c9a86a" />
      </Environment>

      <group rotation={[0, -0.34, 0]} position={[0.6, 0, 0]}>
        {HERO_CANDLES.map((c, i) => (
          <Candle key={i} data={c} i={i} tier={tier} reduceMotion={reduceMotion} count={HERO_CANDLES.length} />
        ))}
      </group>

      {/* trading surface: dark, glossy, champagne gridlines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        {high ? (
          <MeshReflectorMaterial blur={[260, 80]} resolution={512} mixBlur={1} mixStrength={55} roughness={1} depthScale={1.1} minDepthThreshold={0.4} maxDepthThreshold={1.5} color="#080c10" metalness={0.6} mirror={0.85} />
        ) : (
          <meshStandardMaterial color="#06090c" roughness={0.35} metalness={0.6} />
        )}
      </mesh>
      <Grid position={[0, 0.001, 0]} args={[60, 60]} cellSize={0.82} cellThickness={0.6} cellColor="#6d5a38" sectionSize={4.1} sectionThickness={1} sectionColor="#c9a86a" fadeDistance={26} fadeStrength={1.6} infiniteGrid />

      {high && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom intensity={0.85} luminanceThreshold={0.5} luminanceSmoothing={0.2} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.7} />
        </EffectComposer>
      )}
    </>
  )
}

export default function CandleScene({ tier, reduceMotion, visible }: { tier: Exclude<Tier, 'off'>; reduceMotion: boolean; visible: boolean }) {
  const shift = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 0.17 : 0
  return (
    <Canvas
      shadows={tier === 'high'}
      dpr={tier === 'high' ? [1, 1.75] : [1, 1.25]}
      frameloop={visible ? (reduceMotion ? 'demand' : 'always') : 'never'}
      camera={{ position: [-2.6, 2.7, 10.2], fov: 30, near: 0.1, far: 60 }}
      gl={{ antialias: tier === 'high', powerPreference: 'high-performance', alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
      onCreated={({ gl }) => { gl.domElement.setAttribute('aria-hidden', 'true') }}
    >
      <Rig shift={shift} reduceMotion={reduceMotion} />
      <Studio tier={tier} reduceMotion={reduceMotion} />
    </Canvas>
  )
}
