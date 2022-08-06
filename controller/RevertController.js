import Config from '../config';

const revertSubmitWorks = async (work_id, formData) => {
  try {
    const res = await fetch(
      `${Config.API_URL}revert-submit-work/` + `${work_id}`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {revertSubmitWorks};
