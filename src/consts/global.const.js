// Initialize Module
const GlobalConst = {}

GlobalConst.regexp = {
  passwordExp:
    /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  mobileExp: /(\+088)?-?01[0-9]\d{8}/g,
  postCodeExp: /^[0-9]{4}$/,
  alphabetExp: /^[A-Z a-z]+$/,
  numberExp: /^[0-9]+$/,
  alphaNumericExp: /^[a-zA-Z0-9]+$/,
  usernameExp: /^[a-zA-Z0-9]{6,20}$/,
  emailExp:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  objectIdExp: /^[0-9a-fA-F]{24}$/,
}

GlobalConst.supportedMimetypes = {
  image: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'],
  video: ['video/mp4', 'video/avi', 'video/mpeg', 'video/quicktime'],
  pdf: ['application/pdf'],
  gif: ['image/gif'],
  xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  doc: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
}

GlobalConst.allowedFileTypes = ['image', 'video', 'pdf', 'gif', 'xlsx', 'doc']
GlobalConst.convertToWebpMimetype = ['image/png', 'image/jpg', 'image/jpeg']

export default GlobalConst
