import Config from "../config";

const getAssignWorks = async (user_id) => {
    try {
        const res = await fetch(Config.API_URL+'user-assign-works/'+ user_id,{
            method:"get",
            headers:{
                "Content-Type":"application/json",
            },
        });
        const data = await res.json();
        return data;

    } catch (error) {
      console.log(error)
    }
}

const submitWork = async (submit_data, work_id) => {
    try {
        const res = await fetch(Config.API_URL+'user-submit-work/'+ work_id,{
            method:"PUT",
            body:JSON.stringify(submit_data),
            headers:{
                "Content-Type":"application/json",
            },
        });
        const result = await res.json();
        return result;

    } catch (error) {
      console.log(error)
    }
}




export { getAssignWorks, submitWork }