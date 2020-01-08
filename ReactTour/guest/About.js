import React from "react";
import jurassicImageOne from "../images/JurassicImage1.jpg";
import jurassicImageTwo from "../images/JurassicImage2.jpg";
import '../styles.css' ;
function About(){
    return <div>
       <main className="main">
		   <section className="section">
			<h2>About Us</h2>
			<p>Escape to the world of Dinosaur era which is possible now at Jurassic Experience World!. The scientists at our labs were able to
			recreate the lost species from its DNA and we currenty exhibit the most reknown T-Rex Dinosaur. Immerse youurself with real world
			Dinosaur through a glass box what we call the 'pilot'. Checkout our About section and get to know us more!</p>
			<img className="jurassicImageStyle" height="250px" width="450px" margin-left= "100px" src={jurassicImageTwo} alt="Sorry some one ate the page!"  />
			</section>
			</main>
    </div>;
}

export default About;