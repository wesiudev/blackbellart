import { motion } from 'framer-motion'

type loader = {
    visible: boolean
}

const animateLoader = {
    hidden:{
        opacity: 1,
        pathLength: 0,
        pathOffset: 1
    },
    visible: {
        pathOffset: 0,
        opacity:1,
        pathLength:1,
        transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  }

  const animateText = {
    hidden:{
      transform:'translateY(-200px)',
      pathLength: 0,
    },
    visible: {
      transform:'translateY(200px)',
      transition: {
        delay:0.6,
        duration: 1,
        ease: "easeInOut"
      }
    }
  }

  const hideLoader = {
    hidden:{
        display:'none',
        transition: {
          delay:3,
        }
    }
  }

const Loader = (props:loader) => {

    function handleVisibility() {
        if (props.visible) {
            return 'loader'
        }
        if(!props.visible) {
            return 'loader easeOut'
        }
    }
    
    return(
        <motion.div variants={hideLoader} animate="hidden" className={handleVisibility()}>
            <div className="loader__content">
                <svg version="1.1"
                    className='loader__content__logo'
                    xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" width="350.2px" height="350.2px" viewBox="-30 0 1181.2 970.5">
                    <motion.path 
                      variants={animateLoader}
                      initial="hidden"
                      animate="visible"
                      className='loader__content__logo__triangle'
                      d="M424.7,596.1c12.3-12.8,31.4-30,58-45c69.4-39.1,137.1-33.1,158-31c80.1,8.1,132.8,49.4,151,64
                      c0,0,78.4,62.9,120,244c1.8,7.8,4.5,21.1,1,37c-7.2,32.8-35.5,52.3-53,64c-66.3,44.3-156.5,52.1-189,54H0L556.6,0l566.1,983.1
                      M561.7,617.1c6.7,4.5,25,15.8,51,16c25.8,0.2,44.2-10.6,51-15 M535.7,675.1l-33,49 M605.7,686.1v63 M684.7,681.1l26,53"
                    />
                </svg>
                <div className="loader__content__text">
                <motion.div variants={animateText} initial="hidden" animate="visible" >
                    <h1>Blackbell</h1>
                </motion.div>
                </div>
                
            </div>
        </motion.div>
    )
}

export default Loader