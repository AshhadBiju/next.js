import Head from 'next/head';
import CreateCollection from '../components/createCollectionForm';

const CreateCollections = () => {
  return (
    <div>
      <Head>
        <title>Create Collection</title>
      </Head>
      <h1>Create Collection</h1>
      <CreateCollection />
    </div>
  );
};

export default CreateCollections;