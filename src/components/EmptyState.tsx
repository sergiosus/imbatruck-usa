interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function EmptyState({ title, description, actionLabel, actionHref, secondaryLabel, secondaryHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-16 px-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-500">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>}
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {actionLabel && actionHref && (
          <a href={actionHref} className="rounded bg-cta px-4 py-2 text-sm font-medium text-white hover:bg-cta-hover">
            {actionLabel}
          </a>
        )}
        {secondaryLabel && secondaryHref && (
          <a href={secondaryHref} className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-gray-50">
            {secondaryLabel}
          </a>
        )}
      </div>
    </div>
  );
}
