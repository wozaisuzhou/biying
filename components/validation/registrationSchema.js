import * as Yup from 'yup'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const registrationSchema = Yup.object().shape({
  lastName: Yup.string().trim().required("请填写您的姓"),
  firstName: Yup.string().trim().required("请填写您的名"),
  cellphone: Yup.string().required("请填写您的电话号码").matches(phoneRegExp, '您的电话号码不正确'),
  educationId: Yup.string().trim().required("请选择您的专业认证"),
  postCode: Yup.string().trim().required("请填写您的邮政编码"),
  lang: Yup.string().trim().required("请选择您的服务语言"),
  provinceId: Yup.string().trim().required("请填写您所在的省份"),
  cityId: Yup.string().trim().required("请填写您所在的城市"),
  address: Yup.string().trim().required("请填写您的地址"),
  selfIntro: Yup.string().trim().required("请填写您的自我介绍"),
  categories: Yup.array().of(Yup.boolean().oneOf([true],"请选择您的服务类别")).min(1, "请选择您的服务类别"),
  soleTrader: Yup.boolean().oneOf([true], "请确定您是个体经营者").required("请确定您是个体经营者"),
  privacy: Yup.boolean().oneOf([true], "请确定您是个体经营者").required("请确定您同意遵守条款和条件，并已查阅隐私政策"),
})