import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'yourProjectId',
  dataset: 'yourDataset',
  useCdn: true, // `false` if you want to ensure fresh data
});