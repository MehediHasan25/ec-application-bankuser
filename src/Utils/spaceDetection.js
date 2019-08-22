export function spaceUsername(username) {
    const inValid = /\s/;
   // const inValid= new RegExp(/^[a-z0-9_$#@-]{3,30}$/);
    const output = inValid.test(username);
    return output;
}