import Head from 'next/head';
import CreatePlanForm from '../components/createPlan';

const CreatePlans = () => {
  return (
    <div>
      <Head>
        <title>Create Plan</title>
      </Head>
      <h1>Create Plan</h1>
      <CreatePlanForm />
    </div>
  );
};

export default CreatePlans;