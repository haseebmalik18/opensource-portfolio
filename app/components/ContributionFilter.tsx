'use client';

import ContributionCard from './ContributionCard';
import { contributions } from './ContributionList';

export default function ContributionFilter() {
  return (
    <section className="mb-16">

      <div className="mb-8 flex items-center gap-3">
        <h2 className="text-lg font-medium text-gray-400">Apache Airflow Contributions</h2>
        <span className="text-sm px-3 py-1 bg-green-500/20 text-green-400 rounded-full font-medium">{contributions.length}</span>
      </div>


      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        {contributions.map((contribution, index) => (
          <ContributionCard key={index} contribution={contribution} index={index} />
        ))}
      </div>

      {contributions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No contributions found.
        </div>
      )}
    </section>
  );
}
