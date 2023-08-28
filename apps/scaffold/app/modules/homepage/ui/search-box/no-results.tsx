interface Props {
  search: string;
}

export const NoResults = ({ search }: Props) => (
  <div
    className="flex h-[180px] w-full items-center justify-center gap-2"
    data-testid="searchbox.no-results"
  >
    <img
      src="/images/svgs/error.svg"
      alt="Error"
      className="h-8 w-8 rounded-full"
      role="presentation"
    />
    <h3>
      We couldn't find any results for <strong>{search}</strong>
      <br />
      Try searching again.
    </h3>
  </div>
);

NoResults.displayName = 'NoResults';
