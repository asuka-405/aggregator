export const loginConfig = {
  page,
  url: process.env.TEST_CHAT,
  username: process.env.UN_INSTA,
  password: process.env.PW_INSTA,
  fields: {
    un_field: "input[name='username']",
    pw_field: "input[name='password']",
    btn_submit: "button[type='submit']",
  },
}
