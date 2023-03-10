import './Home.css';
import Tool from "../components/Tool";
import ToolsArray from '../components/Tool/Toollist';


function Home() {
  return <>
    <section id="section--about">
    <h1>Tool management system for Mustad's workshop</h1>
    <h2>Tool overview</h2>
      <div id="section--about--stats">
        <div className="about--tools--total">
          <h3>Total</h3>

          {/* Add data */}
          <p>105</p>

        </div>
        <div className="about--tools--available">
          <h3>Available</h3>

          {/* Add data */}
          <p>90</p>


        </div>
        <div className="about--tools--broken">
          <h3>Broken</h3>

          {/* Add data */}
          <p>10</p>


        </div>
        <div className="about--tools--missing">
          <h3>Missing</h3>

          {/* Add data */}
          <p>5</p>


        </div>

      </div>

      <p>
      This section shows a statistical overview of the state of the tools. 
      It shows the total number of existing tools. The number of how many of which are
      available for booking right now, how many are broken as well as the number of tools that
      are missing. To browse or book a tool, click on the button below this paragraph.       
      </p>

      <div className="section--nav">
        <a className="link--onsite" href="#section--tool">See tools</a>
      </div>

    </section>

    <section id="section--intro">
    <h2>About the workshop management system</h2>
    <p>
      This is a management system for the workshop located at Mustad. 
      This system is developed to make it easier for users of the workshop to book tools they'd like to use,
      as well as get an overview of when the different tools are available for use.
    </p>
    <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis ipsam dolor velit, accusantium porro quaerat et laboriosam, 
      id adipisci, similique maiores totam error ullam fugiat ab. Quidem ad tenetur voluptates.
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis ipsam dolor velit, accusantium porro quaerat et laboriosam, 
      id adipisci, similique maiores totam error ullam fugiat ab. Quidem ad tenetur voluptates.
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis ipsam dolor velit, accusantium porro quaerat et laboriosam, 
      id adipisci, similique maiores totam error ullam fugiat ab. Quidem ad tenetur voluptates.
    </p>
    <iframe title="Map of Mustad" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d895.4970110376705!2d10.674728715199532!3d60.789653163044385!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4641db7a7c610437%3A0x5783e79eaec830ba!2sNTNU%20Institutt%20for%20design%2C%20Gj%C3%B8vik!5e0!3m2!1sen!2sus!4v1678442407727!5m2!1sen!2sus"></iframe>

    
    </section>
  
    <section id="section--tool">
      <h2>Tools</h2>
      <p>To book a tool Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Praesentium est alias quaerat dolore tempora, nobis, voluptas quasi pariatur non velit ad laboriosam. 
        Impedit inventore reprehenderit ad aliquam, id numquam qui.
      </p>
      <div className="section--tool--container">
        {/* REPLACE WITH TOOL LIST? */}
        {/* <Tool variant="card"/>
        <Tool variant="card"/>
        <Tool variant="card"/>
        <Tool variant="card"/>
        <Tool variant="card"/>
        <Tool variant="card"/> */}
        <ToolsArray/>
      </div>
    </section>
  </>;
}

export default Home;