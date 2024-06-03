

import Main from "./Main"
import {Provider} from "react-redux"
import { store } from "./redux/store";
import {StripeProvider} from "@stripe/stripe-react-native"

const stripeKey="pk_test_51Og1wWSJ0Sk7yxqNP9kxnfVbodDECLjFJW2PR2uceUWo8jH1B6AjlEGXJpZizah9g5HjgEOQ21x4q6mede56hJDu00VwgEI8jd"

export default function App() {
 
  return (
   <StripeProvider threeDSecureParams={{
    backgroundColor:"#fff",
    timeout:5
   }} merchantIdentifier="6-pack-ecom.com"  publishableKey={stripeKey}
   >
     <Provider store={store}>
<Main/>
    </Provider>
   </StripeProvider>
    
  );
}

