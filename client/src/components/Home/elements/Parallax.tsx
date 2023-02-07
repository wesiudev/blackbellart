import { ParallaxBanner } from 'react-scroll-parallax';
import useWindowDimensions from '../../../common/hooks/useWindowDimensions';

type parallax = {
    image: string
    height: number
    width: number
    speed: number
    correctWidth: boolean
    borders: boolean
}

export const Parallax = (props: parallax) => {

    const { width } = useWindowDimensions();

    function setWidth() {
        if (props.correctWidth===true) {
        if (width<1366) {
            return '100%'
        }else {
            return props.width + 'vw'
        }
    }
    }

    const parallaxStyles = {
        height: props.height + "vh",
        width: setWidth()
    }

    return(
        <>
            <div 
            style={parallaxStyles}
            className="parallax">
                <ParallaxBanner
                    layers={[{ image: props.image, speed: props.speed }]}
                    className="aspect-[2/1]"
                />
            <div className={props.borders ? "borders" : "" }>
                <div className="border"></div>
            </div>
            </div>
        </>
    )
}