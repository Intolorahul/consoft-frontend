import Config from '../config';

const saveStockitem = async voucheritem => {
  try {
    const res = await fetch(Config.API_URL + 'stock-entry', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voucheritem),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//   unit save api
// const saveUnitname = async unitdata => {
//   try {
//     const res = await fetch(Config.API_URL + 'unit', {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(unitdata),
//     });
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getUnits = async () => {
//   try {
//     const res = await fetch(`${Config.API_URL}unit`, {
//       method: 'get',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getItems = async () => {
//   try {
//     const res = await fetch(`${Config.API_URL}item`, {
//       method: 'get',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const updateItems = async (itemid, updateItemdata) => {
//   try {
//     const res = await fetch(`${Config.API_URL}item/` + itemid, {
//       method: 'put',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updateItemdata),
//     });
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const deleteitems = async id => {
//   console.log('object', id);
//   try {
//     const res = await fetch(Config.API_URL + 'item/' + id, {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export {saveStockitem};
