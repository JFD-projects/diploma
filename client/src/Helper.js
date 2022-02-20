export function ImageFinder(props){
    let {
        src = '',
        title = '',
        alt = '',
        className = ''
    } = props;
    
    const arrImages = [`/external/img/${src}`, `./external/img/${src}`, `./img/${src}`, `/img/${src}`];

    src = src !== '' ? src.trim().toLowerCase() : src;

    let ImageJSX = <div/>;

    if(process.env.NODE_ENV && process.env.NODE_ENV === 'development'){
        let srcDev = `./img/${src}`;
        try{
            srcDev = require(`./img/${src}`);
        }catch(e){
            try{
                srcDev = require(`./external/img/${src}`);
            }catch(er){
                srcDev = require('./img/default-img.webp');
            }
        }

        ImageJSX = <img 
            src={srcDev}
            alt={alt} 
            title={title}
            className={className}
        />;

    }else{
        ImageJSX = <img 
            src={arrImages} 
            alt={alt} 
            title={title}
            className = {className}
        />;
    }

    return ImageJSX;
}