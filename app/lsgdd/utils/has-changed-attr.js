// Check if a component has received a new value of some property
// Use from inside a `didReceiveAttrs` hook
export default function(component, propToCheck, newAttrs, oldAttrs) {
  var newProp = component.getAttrFor(newAttrs, propToCheck);
  var oldProp = oldAttrs && component.getAttrFor(oldAttrs, propToCheck);
  if (!oldProp || newProp !== oldProp) {
    return true;
  }
  return false;
}
