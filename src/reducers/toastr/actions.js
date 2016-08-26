import { actions as toastrActions } from 'react-redux-toastr';

const MESSAGE = { label: 'message', icon: null };
const INFO = { label: 'info', icon: 'icon-information-circle' };
const SUCCESS = { label: 'success', icon: 'icon-check-1' };
const WARNING = { label: 'warning', icon: 'icon-exclamation-triangle' };
const ERROR = { label: 'error', icon: 'icon-exclamation-alert' };

export function toastrMessageFactory (title, message) {
  return toastr(MESSAGE, title, message);
}

export function toastrInfoFactory (title, message) {
  return toastr(INFO, title, message);
}

export function toastrSuccessFactory (title, message) {
  return toastr(SUCCESS, title, message);
}

export function toastrWarningFactory (title, message) {
  return toastr(WARNING, title, message);
}

export function toastrErrorFactory (title, message) {
  return toastr(ERROR, title, message);
}

export function toastrCleanFactory () {
  return toastrActions.clean();
}

function toastr(type, title, message) {
  return toastrActions.addToastrAction({
    type: type.label,
    title: title,
    message: message,
    options: {
      icon: type.icon,
      timeOut: 3000,
      removeOnClick: true
    }
  });
}