import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evergreen Remedy Ghana - Forever Arctic Sea Kids Brain Booster",
  description:
    "Help your child learn faster, remember better & excel in school with Forever Arctic Sea - Premium Omega-3, DHA & EPA supplement for growing children.",
  icons: {
    icon: "/egr-logo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* ✅ Meta Pixel Script */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '840496878444318');
            fbq('track', 'PageView');
          `}
        </Script>


        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=850404474110542&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  );
}
