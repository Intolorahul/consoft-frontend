import Config from '../config';

const postCompanyLogout = async formData => {
  try {
    const res = await fetch(Config.API_URL + 'company-logout', {
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

const postUserLogout = async formData => {
  try {
    const res = await fetch(Config.API_URL + 'logout', {
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

export {postCompanyLogout, postUserLogout};
