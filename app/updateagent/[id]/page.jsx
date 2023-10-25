import UpdateAgent from '@/app/components/updateagentdetails'

const getAgentById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3001/api/users/updateuser/${id}`, formData, {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store',
            },
            
          })
          .if(!res.ok) {
            throw new Error("   Failed to fetch Agent");
          }

return res.json ();
        } catch (error) {
           
            console.log("catch error");
           
        }}
    };



export default function EditAgents({ params }) {
    const { id } = params;
    await 
    console.log("id:",id);
    return (
      <div>
    <UpdateAgent/>  </div>
    );
  }