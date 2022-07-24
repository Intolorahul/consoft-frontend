import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {
  HeaderBar,
  FormInput,
  IconButton,
  TextButton,
} from '../../../Components';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {useSelector} from 'react-redux';
import {
  getToolsAndMachinery,
  postToolsAndMachinery,
  deleteToolsAndMachinery,
  editToolsAndMachinery,
} from '../../../controller/toolsAndMachineryController';

const ToolsAndMachinery = ({route}) => {
  const companyData = useSelector(state => state.company);
  const {project_id} = route.params; //
  const [showTAndMModal, setShowTAndMModal] = React.useState(false);
  const [showEditTAndMModal, setShowEditTAndMModal] = React.useState(false);
  const [toolsAndMachinery, setToolsAndMachinery] = React.useState([]);

  //Form data
  const [toolsName, setToolsName] = React.useState('');
  const [toolsQty, setToolsQty] = React.useState('');

  // get tools & machinery
  const fetchToolsAndMachinery = async () => {
    let data = await getToolsAndMachinery();
    setToolsAndMachinery(data);
    console.log('object');
  };

  // post tools & machinery
  const SubmitToolsAndMachinery = async () => {
    const formData = {
      tools_machinery_name: toolsName,
      qty: toolsQty,
      company_id: companyData._id,
    };
    let data = await postToolsAndMachinery(formData);
    if (data.status === 200) {
      setShowTAndMModal(false);
      setToolsName('');
      setToolsQty('');
      fetchToolsAndMachinery();
    }
  };

  // delete tools & machinery
  const DeleteToolsAndMachinery = async id => {
    let data = await deleteToolsAndMachinery(id);
    if (data.status === 200) {
      fetchToolsAndMachinery();
    }
  };

  // edit tools & machinery
  const EditToolsAndMachinery = async () => {
    const formData = {
      tools_machinery_name: toolsName,
      qty: toolsQty,
      company_id: companyData._id,
    };
    let data = await editToolsAndMachinery(formData, toolsId);
    if (data.status === 200) {
      setShowEditTAndMModal(false);
      setToolsName('');
      setToolsQty('');
      fetchToolsAndMachinery();
    }
  };

  React.useEffect(() => {
    fetchToolsAndMachinery();
  }, []);

  const [toolsId, setToolsId] = React.useState('');
  const getEditData = (id, name, qty) => {
    setToolsName(name);
    setToolsQty(qty);
    setToolsId(id);
    setShowEditTAndMModal(true);
  };

  function renderToolsAndMachinery() {
    const renderItem = ({item, index}) => (
      <View
        style={{
          marginVertical: SIZES.radius - 4,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.darkGray,
          }}>
          {index + 1}.
        </Text>
        <View
          style={{
            marginLeft: SIZES.radius,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.darkGray,
              textTransform: 'capitalize',
            }}>
            {item.tools_machinery_name}
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.darkGray,
              // fontWeight: 'bold',
              right: 40,
            }}>
            {item.qty}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              getEditData(item._id, item.tools_machinery_name, item.qty)
            }>
            <ImageBackground
              style={{
                backgroundColor: COLORS.green,
                padding: 5,
                borderRadius: SIZES.base,
                right: 10,
              }}>
              <Image
                source={icons.edit}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.white,
                }}
              />
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => DeleteToolsAndMachinery(item._id)}>
            <ImageBackground
              style={{
                backgroundColor: COLORS.rose_600,
                padding: 5,
                borderRadius: SIZES.base,
              }}>
              <Image
                source={icons.delete_icon}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.white,
                }}
              />
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    );
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          padding: 20,
          ...styles.shadow,
        }}>
        <FlatList
          data={toolsAndMachinery}
          keyExtractor={item => `${item._id}`}
          scrollEnabled={true}
          maxHeight={510}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.gray3,
                  marginVertical: 5,
                }}></View>
            );
          }}
        />
      </View>
    );
  }

  function renderAddToolsAndMachineModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={showTAndMModal}>
        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack7,
            }}>
            <View
              style={{
                position: 'absolute',
                left: SIZES.padding,
                width: '90%',
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
              }}>
              <View style={{}}>
                {/* header */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{flex: 1, fontSize: 20, color: COLORS.darkGray}}>
                    Tools & Machine
                  </Text>
                  <IconButton
                    containerStyle={{
                      boborderWidth: 2,
                      borderRadius: 10,
                      borderColor: COLORS.gray2,
                    }}
                    icon={icons.cross}
                    iconStyle={{
                      tintColor: COLORS.gray,
                    }}
                    onPress={() => setShowTAndMModal(false)}
                  />
                </View>
                <ScrollView>
                  <FormInput
                    label="Item name"
                    keyboardType="default"
                    autoCompleteType="username"
                    // value={toolsName}
                    onChange={value => {
                      setToolsName(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            toolsName == '' || toolsName != ''
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              toolsName == ''
                                ? COLORS.gray
                                : toolsName != ''
                                ? COLORS.green
                                : COLORS.red,
                          }}
                        />
                      </View>
                    }
                  />
                  <FormInput
                    label="Quantity"
                    keyboardType="numeric"
                    // value={toolsQty.toString()}
                    onChange={value => {
                      setToolsQty(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            toolsQty == '' || toolsQty != ''
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              toolsQty == ''
                                ? COLORS.gray
                                : toolsQty != ''
                                ? COLORS.green
                                : COLORS.red,
                          }}
                        />
                      </View>
                    }
                  />
                  <TextButton
                    label="Submit"
                    buttonContainerStyle={{
                      height: 45,
                      marginTop: SIZES.padding * 1.5,
                      alignItems: 'center',
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.lightblue_700,
                    }}
                    onPress={() => SubmitToolsAndMachinery()}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  function renderEditToolsAndMachineModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEditTAndMModal}>
        <TouchableWithoutFeedback onPress={() => setShowEditTAndMModal(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack7,
            }}>
            <View
              style={{
                position: 'absolute',
                left: SIZES.padding,
                width: '90%',
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
              }}>
              <View style={{}}>
                {/* header */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{flex: 1, fontSize: 20, color: COLORS.darkGray}}>
                    Tools & Machine
                  </Text>
                  <IconButton
                    containerStyle={{
                      boborderWidth: 2,
                      borderRadius: 10,
                      borderColor: COLORS.gray2,
                    }}
                    icon={icons.cross}
                    iconStyle={{
                      tintColor: COLORS.gray,
                    }}
                    onPress={() => setShowEditTAndMModal(false)}
                  />
                </View>
                <ScrollView>
                  <FormInput
                    label="Item name"
                    keyboardType="default"
                    autoCompleteType="username"
                    value={toolsName}
                    onChange={value => {
                      setToolsName(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            toolsName == '' || toolsName != ''
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              toolsName == ''
                                ? COLORS.gray
                                : toolsName != ''
                                ? COLORS.green
                                : COLORS.red,
                          }}
                        />
                      </View>
                    }
                  />
                  <FormInput
                    label="Quantity"
                    keyboardType="numeric"
                    value={toolsQty.toString()}
                    onChange={value => {
                      setToolsQty(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            toolsQty == '' || toolsQty != ''
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              toolsQty == ''
                                ? COLORS.gray
                                : toolsQty != ''
                                ? COLORS.green
                                : COLORS.red,
                          }}
                        />
                      </View>
                    }
                  />
                  <TextButton
                    label="Update"
                    buttonContainerStyle={{
                      height: 45,
                      marginTop: SIZES.padding * 1.5,
                      alignItems: 'center',
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.lightblue_700,
                    }}
                    onPress={() => EditToolsAndMachinery()}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightblue_50,
      }}>
      <HeaderBar right={true} title="Tools & Machinery" />
      <TextButton
        label="Add New"
        buttonContainerStyle={{
          height: 45,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_700,
          ...styles.shadow,
        }}
        onPress={() => {
          setToolsName('');
          setToolsQty('');
          setShowTAndMModal(true);
        }}
      />
      {renderToolsAndMachinery()}
      {renderAddToolsAndMachineModal()}
      {renderEditToolsAndMachineModal()}
    </View>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
export default ToolsAndMachinery;
