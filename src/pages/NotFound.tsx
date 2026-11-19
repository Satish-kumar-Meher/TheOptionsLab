import { PageHeader, LinkButton } from '@/components/ui'

export default function NotFound() {
  return (
    <PageHeader eyebrow="404" title="This strike isn't on the chain." description="The page you were looking for doesn't exist or has moved.">
      <div className="flex flex-wrap gap-3">
        <LinkButton to="/">Back to home</LinkButton>
        <LinkButton to="/curriculum" variant="secondary">Browse the curriculum</LinkButton>
      </div>
    </PageHeader>
  )
}
