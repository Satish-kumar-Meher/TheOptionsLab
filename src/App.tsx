import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'

const Curriculum = lazy(() => import('@/pages/Curriculum'))
const Lesson = lazy(() => import('@/pages/Lesson'))
const Labs = lazy(() => import('@/pages/Labs'))
const Strategies = lazy(() => import('@/pages/Strategies'))
const Risk = lazy(() => import('@/pages/Risk'))
const Quant = lazy(() => import('@/pages/Quant'))
const Roadmap = lazy(() => import('@/pages/Roadmap'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="curriculum" element={<Curriculum />} />
        <Route path="curriculum/:level" element={<Curriculum />} />
        <Route path="learn/:moduleId" element={<Lesson />} />
        <Route path="labs" element={<Labs />} />
        <Route path="labs/:labId" element={<Labs />} />
        <Route path="strategies" element={<Strategies />} />
        <Route path="strategies/:slug" element={<Strategies />} />
        <Route path="risk" element={<Risk />} />
        <Route path="quant" element={<Quant />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
