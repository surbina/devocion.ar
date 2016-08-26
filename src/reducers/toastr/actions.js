import { actions as toastrActions } from 'react-redux-toastr';

const timeOut = 4000;

const MESSAGE = { label: 'message', icon: null };
const INFO = { label: 'info', icon: 'icon-information-circle' };
const SUCCESS = { label: 'success', icon: 'icon-check-1' };
const WARNING = { label: 'warning', icon: 'icon-exclamation-triangle' };
const ERROR = { label: 'error', icon: 'icon-exclamation-alert' };

export function toastrMessage (title, message) {
  return toastr(MESSAGE, title, message);
}

export function toastrInfo (title, message) {
  return toastr(INFO, title, message);
}

export function toastrSuccess (title, message) {
  return toastr(SUCCESS, title, message);
}

export function toastrWarning (title, message) {
  return toastr(WARNING, title, message);
}

export function toastrError (title, message) {
  return toastr(ERROR, title, message);
}

export function toastrClean () {
  return toastrActions.clean();
}

function toastr(type, title, message) {
  return toastrActions.addToastrAction({
    type: type.label,
    title: title,
    message: message,
    options: {
      icon: type.icon,
      timeOut: timeOut,
      removeOnClick: true
    }
  });
}