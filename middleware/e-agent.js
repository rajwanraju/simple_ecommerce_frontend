export default function(context){

  console.log()
  
    if(!context.app.context.app.$cookies.get('isCustomer')){
      context.redirect('/e-agent/login');
    }
  }