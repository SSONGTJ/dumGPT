import ChatBody from "../component/ChatBody";
import { Navigation } from "../component/Navigation";

const MainPage = () => {
    return ( 
        <>
        <Navigation />
        <main>
          <ChatBody/>
        </main>
      </>
    );
}

export {MainPage}