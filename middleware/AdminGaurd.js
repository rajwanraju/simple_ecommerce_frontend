export default function(context){
  
  if (!context.app.context.app.$cookies.get('isAdmin')) {
    context.redirect('/');
  }
}
