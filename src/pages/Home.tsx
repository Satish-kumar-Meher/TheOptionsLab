import { Hero } from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
import { Journey } from '@/components/home/Journey'
import { FeaturedModules } from '@/components/home/FeaturedModules'
import { WhyDifferent } from '@/components/home/WhyDifferent'
import { WhatYouLearn } from '@/components/home/WhatYouLearn'
import { Approach } from '@/components/home/Approach'
import { Scenarios } from '@/components/home/Scenarios'
import { FeaturedStrategies } from '@/components/home/FeaturedStrategies'
import { FinalCta } from '@/components/home/FinalCta'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Journey />
      <FeaturedModules />
      <WhyDifferent />
      <WhatYouLearn />
      <Approach />
      <Scenarios />
      <FeaturedStrategies />
      <FinalCta />
    </>
  )
}
