import { Headline } from "./elements/Headline"
import { Parallax } from "./elements/Parallax"
import { AboutMe, AboutArt, AboutRequest } from "./elements/About"
import {motion} from 'framer-motion'
import heroImg from '../../common/images/heroImg.png'
import img0 from '../../common/images/img0.png'
import artist from '../../common/images/eliza.png'
import img1 from '../../common/images/6.png'
import img2 from '../../common/images/8.png'
import Button from "./elements/Button"

const Home = (isFirstLoad:boolean) => {

    const opacity = () => {
        if (isFirstLoad) {
            return 0
        }else{
            return 1
        }
    } 

    const animateContent = {
        hidden:{
            opacity: opacity(),
        },
        visible: {
            opacity:1,
            transition: {
            delay:2.8,
            duration: .3,
            ease: "easeInOut"
          }
        }
      }

    return(
        <>
        <motion.div variants={animateContent} initial="hidden" animate="visible" className="wrapper">
            <Headline text='SZTUKA'/>
            <Parallax image={heroImg} height={50} width={80} speed={15} correctWidth={false} borders={true}/>
            <Headline text='O MNIE'/>
            <div className="wrapper__about">
                <Parallax image={artist} height={80} width={55} speed={15} correctWidth={true} borders={false}/>
                <AboutMe/>
            </div>
            <Headline text='INSPIRACJA'/>
            <div className="wrapper__about columnReverse">
                <AboutArt/>
                <Parallax image={img0} height={80} width={55} speed={15} correctWidth={true} borders={false}/>
            </div>
            <Headline text='PRACE NA ZAMÓWIENIE'/>
            <div className="wrapper__request">
                <img src={img1} alt="" />
                <img src={img2} alt="" />
            </div>
            <AboutRequest/>
            
            <Button text="KONTAKT"/>
        </motion.div>
        </>
    )
}

export default Home