import { combineReducers } from 'redux';
import * as types from '../actions/types';
import * as init from './defaults';

// reducers
function main(state = init.main, action) {
  switch(action.type) {
    case types.SET_MAIN_CONTENT:
      return Object.assign(
        {}, state, { content: action.data }
      );
    default:
      return state;
  }
}

function splash(state = init.splash, action) {
  switch(action.type) {
    case types.PARALLAX:
      return Object.assign(
        {}, state, { top: action.top }
      );
    case types.SET_SPLASH_OPACITY:
      return Object.assign(
        {}, state, { opacity: action.opacity }
      );
    case types.SET_SPLASH_VISIBILITY:
      return Object.assign(
        {}, state, { isVisible: action.isVisible }
      );
    default:
      return state;
  }
}

function navbar(state = init.navbar, action) {
  switch(action.type) {
    case types.SHOW_NAV_FULL_SIZE:
      return Object.assign(
        {}, state, { fullSize: action.isFullSize }
      );
    case types.TOGGLE_NAV:
      return Object.assign(
        {}, state, { toggleNav: !state.toggleNav }
      );
    case types.ANIMATE_NAV:
      return Object.assign(
        {}, state, { animate: action.isAnimated }
      );
    case types.SET_SCROLL_POS:
      return Object.assign(
        {}, state, { scrollPos: action.scrollPos }
      );
    default:
      return state;
  }
}

function footer(state = init.footer, action) {
  switch(action.type) {
    case types.SHOW_FOOTER_FULL_SIZE:
      return Object.assign(
        {}, state, { fullSize: action.isFullSize }
      );
    default:
      return state;
  }
}

function modal(state = init.modal, action) {
  switch(action.type) {
    case types.SHOW_MODAL:
      return Object.assign(
        {}, state, { showModal: action.isVisible }
      );
    case types.PEEK_MODAL:
      return Object.assign(
        {}, state, { peekModal: action.isPeeking }
      );
    case types.SET_MODAL_CONTENT:
      return Object.assign(
        {}, state, { content: action.project }
      );
    default:
      return state;
  }
}

function contact(state = init.contact, action) {
  switch(action.type) {
    case types.SHOW_CONTACT_FORM:
      return Object.assign(
        {}, state, { showForm: action.isVisible }
      );
    case types.SET_FORM_COMPLETED:
      return Object.assign(
        {}, state, { isComplete: action.isComplete }
      );
    default:
      return state;
  }
}

// combine reducers
export default combineReducers({
  main, 
  splash,
  navbar,
  footer,
  modal,
  contact
});
