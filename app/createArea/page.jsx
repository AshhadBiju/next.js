import Head from 'next/head';
import CreateArea from '../components/createAreaForm';

const CreateAreaForm = () => {
  return (
    <div>
      <Head>
        <title>Create Area</title>
      </Head>
      <h1>Create Area</h1>
      <CreateArea />
    </div>
  );
};

export default CreateAreaForm;