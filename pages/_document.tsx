import Document, { Html, Head, Main, NextScript} from 'next/document';
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../styles/theme'

export default class MyDocument extends Document {
    static async getInitialProps(ctx: never) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }
    render () {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }    
}