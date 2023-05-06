import * as Yup from 'yup'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const orderSchema = Yup.object().shape({
  categoryId: Yup.string().trim().required('请选择您所需的服务！'),
  description: Yup.string().trim().required('请填写您的具体需求！'),
  budget: Yup.number().positive().required('请填写您的预算金额！'),
  name: Yup.string().trim().required("请填写您的姓名"),
  provinceId: Yup.string().trim().required("请填写您所在的省份"),
  cityId: Yup.string().trim().required("请填写您所在的城市"),
  address: Yup.string().trim().required("请填写您的具体地址"),
  email: Yup.string().email("请填写正确的email").required("请填写您的email地址"),
  cellphone: Yup.string().required("请填写您的电话号码").matches(phoneRegExp, '您的电话号码不正确'),
  privacy: Yup.boolean().oneOf([true], "请确定您同意遵守条款和条件，并已查阅隐私政策").required("请确定您同意遵守条款和条件，并已查阅隐私政策"),
})