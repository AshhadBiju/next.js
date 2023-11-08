import Head from 'next/head';
import CreateAgent from '../components/createAgent'

const CreateAreaForm = () => {
  return (
    <div>
      <Head>
        <title>Create Agent</title>
      </Head>
      <h1>Create Agent</h1>
      <CreateAgent />
    </div>
  );
};

export default CreateAreaForm;