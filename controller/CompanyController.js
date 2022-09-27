import Config from '../config';

const postCompanyTeam = async formData => {
  try {
    const res = await fetch(Config.API_URL + 'user-register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateCompanyTeam = async (formData, id) => {
  try {
    const res = await fetch(Config.API_URL + 'update-user/' + id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {postCompanyTeam, updateCompanyTeam};
