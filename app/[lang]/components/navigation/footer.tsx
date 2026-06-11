'use client'
import {
  aboutUrl,
  annualReportsUrl,
  antiFraudCorruptionPolicyUrl,
  audtiorLegalUrl,
  SECPUrl,
  capitalUrl,
  careersUrl,
  digitalUrl,
  disclaimerUrl,
  innovationUrl,
  newsmediaUrl,
  privacyPolicyUrl,
  procurementUrl,
  researchUrl,
  sitemapUrl,
  statusNtnUrl,
} from '../../../../utils/urls'
import { usePathname } from 'next/navigation'
import { i18n } from '../../../../i18n.config'
import { IoIosArrowDown } from 'react-icons/io'
import { BsTwitterX } from 'react-icons/bs'
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { LiaFacebookF } from 'react-icons/lia'
import Image from 'next/image'
import SubscribeForm from './subscribeForm'
import jamapunji from './../../images/JamaPunjiLogo.png'
import './footer.css'

export const Footer = ({ trans, lang }: any) => {
  const pathname = usePathname()
  const isUrdu = lang === 'ur'
  const alternateLocale = lang === 'en' ? 'ur' : 'en'
  const navAlignmentClass = isUrdu ? 'ms-auto' : 'me-auto'

  const redirectedPathName = (locale: any) => {
    if (!pathname) return '/'

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
      if (locale === i18n.defaultLocale) return pathname
      return `/${locale}${pathname}`
    } else {
      if (locale === i18n.defaultLocale) {
        const segments = pathname.split('/')
        const isHome = segments.length === 2
        if (isHome) return '/'

        segments.splice(1, 1)
        return segments.join('/')
      }

      const segments = pathname.split('/')
      segments[1] = locale
      return segments.join('/')
    }
  }
  return (
    <div>
      <footer className='footer-wrapper bg-blue90 section-py-sm pb-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-6'>
              <div className='logo-white'>
                <svg width='212' height='63' viewBox='0 0 212 63' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g clipPath='url(#clip0_1298_6795)'>
                    <path
                      d='M81.4937 31.7438H80.8007V37.5541H78.1123V23.4541H80.8007V29.2644H81.4363L86.1465 23.4541H89.4749L83.4581 30.5063L89.8192 37.5586H86.3848L81.4937 31.7482V31.7438Z'
                      fill='#EDF4F7'
                    />
                    <path
                      d='M101.036 34.4097H94.9267L93.7613 37.5499H90.9272L96.4011 23.4321H99.5441L105.053 37.5499H102.197L101.032 34.4097H101.036ZM100.091 31.8682L97.9637 26.1688L95.8537 31.8682H100.091Z'
                      fill='#EDF4F7'
                    />
                    <path
                      d='M116.036 37.5499L113.471 32.7819C113.255 32.7996 113.052 32.7996 112.836 32.7996H110.288V37.5499H107.6V23.4321H113.034C117.29 23.4321 118.817 25.295 118.817 28.1247C118.817 30.2449 117.872 31.6864 115.908 32.3605L118.963 37.5499H116.036ZM112.836 30.4799C114.782 30.4799 116.071 29.9521 116.071 28.1602C116.071 26.3683 114.888 25.8228 113.034 25.8228H110.288V30.4799H112.836Z'
                      fill='#EDF4F7'
                    />
                    <path
                      d='M130.506 34.4097H124.397L123.231 37.5499H120.397L125.871 23.4321H129.014L134.523 37.5499H131.667L130.502 34.4097H130.506ZM129.562 31.8682L127.434 26.1688L125.324 31.8682H129.562Z'
                      fill='#EDF4F7'
                    />
                    <path
                      d='M150.013 23.4321V37.5499H147.413L139.688 27.7211V37.5499H137.071V23.4321H139.688L147.413 33.2964V23.4321H150.013Z'
                      fill='#EDF4F7'
                    />
                    <path
                      d='M166.682 30.5021C166.682 34.5737 163.994 37.5543 160.065 37.5543H153.721V23.4365H160.065C164.011 23.4365 166.682 26.3417 166.682 30.5065V30.5021ZM163.883 30.5021C163.883 27.8896 162.449 25.9336 160.065 25.9336H156.41V35.0483H160.065C162.466 35.0483 163.883 33.0746 163.883 30.5021Z'
                      fill='#EDF4F7'
                    />
                    <path
                      d='M178.698 34.4097H172.589L171.423 37.5499H168.589L174.063 23.4321H177.206L182.715 37.5499H179.859L178.694 34.4097H178.698ZM177.753 31.8682L175.626 26.1688L173.516 31.8682H177.753Z'
                      fill='#EDF4F7'
                    />
                    <path
                      d='M194.184 34.4097H188.074L186.909 37.5499H184.075L189.549 23.4321H192.692L198.201 37.5499H195.345L194.179 34.4097H194.184ZM193.239 31.8682L191.111 26.1688L189.001 31.8682H193.239Z'
                      fill='#EDF4F7'
                    />
                    <path
                      d='M212 24.9666L203.966 35.1591L212 35.0127V37.5498H200.165V36.0506L208.199 25.8404L200.165 25.9867V23.4497H212V24.9666Z'
                      fill='#EDF4F7'
                    />
                    <path
                      d='M38.8201 34.3207C38.798 29.0825 38.8289 23.8488 38.9878 18.6195C39.0055 18.6106 39.0231 18.6061 39.0408 18.5973C39.4646 19.0807 39.9016 19.5509 40.3165 20.0432C42.6032 22.7488 44.6029 25.6584 46.4922 28.6523C47.4457 30.1559 48.3551 31.6905 49.2821 33.2118C49.3174 33.265 49.3439 33.3227 49.3837 33.3937C48.2006 34.7154 46.8542 35.8464 45.4019 36.8577C44.6603 35.4783 43.9231 34.1122 43.1771 32.7284C42.2765 33.1719 41.7071 33.8239 41.4466 34.7332C41.2127 35.5448 41.323 36.3388 41.6364 37.1061C41.8527 37.6383 42.1044 38.1528 42.3516 38.6984C39.4513 40.2197 36.3833 41.2931 33.2006 42.118C32.0661 38.8935 30.371 35.9662 28.5346 33.0743C28.2697 33.2917 28.0225 33.4824 27.7886 33.6864C27.0911 34.2985 26.4466 34.9549 26.0405 35.8065C25.8727 36.1569 25.7226 36.5206 25.7226 36.9242C25.7226 37.2081 25.833 37.4299 26.0758 37.5585C26.3053 37.6782 26.5481 37.7758 26.7953 37.8557C27.2235 37.9932 27.5458 38.2415 27.7842 38.6407C28.7244 40.2286 29.7 41.7943 30.6182 43.3954C31.2229 44.4555 31.7129 45.5776 31.9778 46.7796C32.0484 47.0945 32.0837 47.4227 32.1058 47.7465C32.1279 48.0969 31.9734 48.3941 31.7703 48.6691C31.4084 49.1614 30.936 49.5384 30.4416 49.8799C29.1173 50.7936 27.6694 51.4678 26.1994 52.1021C25.4843 52.4081 24.7603 52.6875 24.0364 52.9714C23.9437 53.0069 23.8289 53.0246 23.7362 52.998C21.6305 52.4658 19.5646 51.8138 17.6002 50.869C15.936 50.0662 14.3689 49.1082 12.9077 47.9772C12.8503 47.9328 12.8018 47.8885 12.7312 47.8264C12.996 47.5469 13.2521 47.2764 13.5037 47.0014C15.0222 45.3559 16.4304 43.6216 17.5517 41.6745C18.2138 40.5257 18.7479 39.3282 19.0084 38.0153C19.2159 36.9508 19.0967 35.9085 18.8406 34.8751C18.3021 32.7106 17.3971 30.697 16.3907 28.7232C15.9051 27.7696 15.3621 26.8426 14.8456 25.9068C14.8103 25.8402 14.7618 25.7781 14.7132 25.7027C14.2629 25.8802 13.9142 26.1773 13.6273 26.5455C12.9122 27.4636 12.7841 28.5015 13.1858 29.5615C13.5037 30.3998 13.9275 31.2026 14.338 32.001C15.0178 33.3183 15.7506 34.609 16.4039 35.9396C16.7306 36.6093 16.9557 37.3367 17.1853 38.0464C17.4413 38.8447 17.2956 39.5988 16.8763 40.3173C16.4392 41.058 15.8918 41.7056 15.2959 42.3176C14.1261 43.5152 12.8415 44.5708 11.4863 45.5422C11.2347 45.724 10.9566 45.8615 10.6564 46.0389C10.1443 45.4801 9.62345 44.9478 9.1467 44.3801C7.29266 42.1934 5.74322 39.8072 4.65287 37.1371C3.98189 35.4916 3.54928 33.7884 3.35063 32.0231C3.01955 29.0958 3.38595 26.2439 4.26882 23.4496C4.99719 21.1343 6.06105 18.9876 7.60608 17.1026C9.04075 15.3506 10.7888 14.0022 12.7885 12.9644C14.6249 12.0152 16.5452 11.3277 18.589 11.0084C19.4719 10.8709 20.3724 10.7733 21.2685 10.7644C26.9852 10.7201 31.9999 12.6716 36.454 16.2066C36.7983 16.4816 36.9263 16.7522 36.9219 17.1957C36.9087 18.7658 36.9351 20.3359 36.9705 21.9105C37.0014 23.352 37.0455 24.7935 37.0985 26.235C37.1382 27.2551 37.1956 28.2797 37.253 29.2998C37.2839 29.872 37.3324 30.4486 37.3766 31.0208C37.381 31.0873 37.4075 31.1582 37.4384 31.2203C37.9681 32.1917 38.4404 33.1941 38.7759 34.2497C38.7848 34.2807 38.8068 34.3029 38.8245 34.3295L38.8201 34.3207ZM22.1514 12.4232C22.1514 12.4232 22.1117 12.4543 22.0896 12.4676C22.0896 12.5075 22.0808 12.5519 22.0808 12.5918C22.0411 14.3171 22.0102 16.0469 21.966 17.7723C21.9307 19.2848 21.8689 20.7972 21.8424 22.3141C21.8159 23.7911 21.8159 25.2725 21.8203 26.7495C21.8203 28.1422 21.838 29.5349 21.8645 30.9276C21.8821 32.1074 21.9042 33.2872 21.9484 34.467C22.0234 36.321 22.1117 38.1706 22.2132 40.0245C22.2353 40.3927 22.2044 40.7653 22.4075 41.1201C22.9019 41.985 23.308 42.8898 23.6214 43.8345C23.6479 43.9144 23.6788 43.9942 23.7097 44.074C23.7538 44.0075 23.7538 43.9543 23.7538 43.8966C23.7538 43.1692 23.745 42.4463 23.7494 41.7189C23.7583 39.0222 23.7671 36.3299 23.7803 33.6332C23.7803 32.8304 23.798 32.0276 23.8201 31.2248C23.8774 29.3087 23.9304 27.3882 24.0099 25.4721C24.0628 24.208 24.1511 22.9484 24.2262 21.6843C24.3056 20.3138 24.4028 18.9477 24.469 17.5771C24.5175 16.5747 24.5264 15.5724 24.5573 14.5744C24.5573 14.4369 24.5087 14.3615 24.3983 14.2817C23.8024 13.8381 23.2109 13.3857 22.6326 12.9244C22.456 12.7825 22.3148 12.5918 22.1558 12.4232H22.1514ZM11.9233 16.7566C10.9875 17.6038 10.0781 18.4332 9.15111 19.2759C9.99425 20.2162 10.8197 21.1343 11.6629 22.0702C12.5943 21.223 13.5081 20.3892 14.4351 19.542C13.592 18.6061 12.7665 17.6925 11.9233 16.7566ZM30.2562 29.628C31.1876 28.7809 32.1014 27.947 33.0284 27.1043C32.1853 26.1685 31.3598 25.2503 30.5211 24.3189C29.5852 25.1661 28.6714 25.991 27.7444 26.8338C28.5876 27.7741 29.4131 28.6922 30.2562 29.628Z'
                      fill='#EDF4F7'
                    />
                    <path
                      d='M52.3677 29.3795C51.9351 28.6743 51.5202 27.9868 51.0964 27.3082C49.2953 24.4429 47.3486 21.6841 45.0884 19.1604C43.3668 17.231 41.4731 15.4923 39.3453 14.0242C39.2747 13.9754 39.2173 13.8513 39.2217 13.767C39.2747 12.8178 39.3453 11.8686 39.4071 10.9195C39.4557 10.1389 39.5175 9.35822 39.544 8.5776C39.5881 7.3357 39.6058 6.08936 39.6411 4.84745C39.6455 4.68334 39.5926 4.59464 39.4513 4.51037C38.6876 4.05352 38.0078 3.48579 37.3942 2.83823C37.3456 2.78944 37.2971 2.74509 37.2132 2.66525C37.1293 5.97404 37.0455 9.23403 36.9572 12.5384C36.6791 12.3965 36.4451 12.2723 36.2067 12.1481C33.6376 10.8219 30.9183 9.94813 28.0843 9.41145C26.3141 9.07436 24.5307 8.88364 22.7297 8.91469C17.4059 9.00783 12.6252 10.6445 8.50216 14.073C5.9021 16.2375 4.06572 18.9652 2.83411 22.1099C2.14547 23.8708 1.66872 25.6937 1.34206 27.5566C1.02422 29.3529 0.869719 31.1625 0.93152 32.9854C1.12134 38.6361 2.86943 43.688 6.65254 47.9548C6.70551 48.0125 6.75407 48.0746 6.8247 48.1544C6.30822 48.4471 5.80057 48.731 5.26643 49.0282C4.92211 48.4693 4.57337 47.9238 4.25112 47.3693C2.47655 44.3267 1.24053 41.08 0.582785 37.6204C0.353238 36.4229 0.189906 35.2076 0.101619 33.9923C0.00450303 32.6838 -0.0263975 31.3621 0.0221605 30.0537C0.119277 27.3037 0.604857 24.6115 1.43476 21.9857C2.87826 17.4306 5.23111 13.4077 8.4845 9.92152C10.9477 7.28247 13.7817 5.14019 16.9822 3.47692C19.4939 2.17293 22.1381 1.23263 24.906 0.656029C26.2965 0.363294 27.7047 0.172573 29.1217 0.074995C30.4945 -0.0225831 31.8674 -0.0358892 33.2359 0.0483828C36.3524 0.239104 39.3851 0.851185 42.2986 1.97777C49.8692 4.90068 55.524 9.99248 59.2895 17.2088C59.3689 17.3596 59.3733 17.4927 59.3115 17.6479C58.6538 19.3245 57.7886 20.8991 56.8748 22.4426C55.4931 24.78 54.0187 27.0509 52.4516 29.2642C52.4295 29.2908 52.4075 29.3174 52.3721 29.3706L52.3677 29.3795Z'
                      fill='#EDF4F7'
                    />
                    <path
                      d='M7.7605 52.2528C8.36968 51.7649 8.97003 51.2815 9.58363 50.7892C12.0115 52.7585 14.744 54.1645 17.7414 55.127C16.6687 55.4419 15.596 55.7612 14.4792 56.0894C14.797 56.4443 15.0795 56.7769 15.3797 57.0918C16.2184 57.9789 17.1013 58.8216 18.1431 59.4736C18.6198 59.7708 19.1187 60.0414 19.6925 60.0591C19.953 60.068 20.2443 60.0369 20.4695 59.9216C23.9127 58.1164 27.1263 55.983 29.8721 53.1976C31.214 51.8359 32.3662 50.3323 33.121 48.5493C33.5757 47.4759 33.8141 46.3627 33.8053 45.1962C33.8053 45.0587 33.8715 45.0321 33.9686 44.9966C36.5378 44.0385 39.054 42.943 41.5304 41.7588C42.1175 41.4793 42.6781 41.1467 43.252 40.8362C43.3271 40.7963 43.3977 40.7564 43.4904 40.7031C43.7288 41.1422 43.9583 41.5636 44.1834 41.9894C44.7176 43.0051 45.2517 44.0297 45.5872 45.1296C45.7329 45.6042 45.8123 46.1099 45.8653 46.6066C45.9271 47.1433 45.6932 47.6223 45.4327 48.0747C44.8897 49.0283 44.1525 49.8267 43.3756 50.5851C42.272 51.6629 41.0978 52.6565 39.8265 53.5302C39.1246 54.0137 38.3521 54.3996 37.606 54.8209C34.5027 56.564 31.395 58.2983 28.2873 60.0369C28.2343 60.068 28.1814 60.1034 28.0931 60.1567C28.1814 60.201 28.2432 60.2365 28.3094 60.2631C29.6867 60.8131 31.0948 61.2345 32.5648 61.4429C33.174 61.5316 33.7964 61.5804 34.3968 61.4119C34.7014 61.3232 35.006 61.1812 35.2753 61.0038C36.6525 60.0857 37.8974 58.9946 39.1069 57.8725C41.1022 56.0229 42.9695 54.0492 44.5896 51.8537C45.6755 50.3811 46.6378 48.8376 47.2647 47.1034C47.5781 46.2385 47.7812 45.347 47.7723 44.42C47.7635 43.4974 47.5825 42.597 47.3044 41.7233C47.0307 40.8584 46.7085 40.0112 46.4039 39.1552C46.3774 39.0842 46.3509 39.0133 46.3156 38.929C47.8297 37.8955 49.2732 36.7778 50.624 35.5049C50.8138 35.8375 51.0036 36.1569 51.1846 36.4762C53.383 40.3616 55.5769 44.247 57.7797 48.1279C57.8592 48.2654 57.8327 48.3542 57.7576 48.4739C56.6364 50.2259 55.3606 51.8537 53.9215 53.3528C51.3921 55.9874 48.4963 58.1208 45.2341 59.7442C42.634 61.0349 39.9103 61.9397 37.0587 62.4719C34.7323 62.9066 32.3883 63.0663 30.0266 62.9687C25.7623 62.7913 21.6922 61.7845 17.8341 59.9305C14.5321 58.3426 11.601 56.2402 9.03184 53.6278C8.61247 53.202 8.21959 52.754 7.81788 52.3194C7.80023 52.3016 7.78698 52.275 7.76933 52.2528H7.7605Z'
                      fill='#EDF4F7'
                    />
                    <path
                      d='M60.4241 43.3022C60.0798 42.7123 59.7708 42.1801 59.4618 41.6478C57.621 38.4677 55.7802 35.2875 53.9306 32.1074C53.8511 31.9743 53.8555 31.89 53.9526 31.7747C56.4997 28.6921 58.8702 25.4765 61.1083 22.1633C61.1392 22.1189 61.1745 22.0745 61.2363 21.9858C63.3905 29.1933 63.1345 36.2589 60.4153 43.3022H60.4241Z'
                      fill='#EDF4F7'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_1298_6795'>
                      <rect width='212' height='63' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className='col-sm-12 col-md-6'>
              <ul className='socialicons list-inline  d-flex justify-content-md-end mb-0'>
                <li className='px-2'>
                  <a href='https://www.facebook.com/KarandaazPK/' target='_blank'>
                    <LiaFacebookF />
                  </a>
                </li>
                <li className='px-2'>
                  <a href='https://www.youtube.com/channel/UCyTCehajYSbwdUj0BPxz2cQ' target='_blank'>
                    <FaYoutube />
                  </a>
                </li>
                <li className='px-2'>
                  <a href='https://www.instagram.com/karandaazpk/' target='_blank'>
                    <FaInstagram />
                  </a>
                </li>
                <li className='px-2'>
                  <a href='https://x.com/karandaazpk' target='_blank'>
                    <BsTwitterX />
                  </a>
                </li>
                <li className='px-2'>
                  <a href='https://www.linkedin.com/company/karandaaz-pakistan' target='_blank'>
                    <FaLinkedinIn />
                  </a>
                </li>
              </ul>
            </div>
            <div className='col-sm-12 col-md-3'>
              <div className='widget py-md-5'>
                <h4 className='subtitle-style-1 tx-white pb-3'>{trans.contactUs}</h4>
                <a className='tx-blue00 mb-3 d-block opacity-50' href='tel:+92 (51) 8449761'>
                  {trans.number}
                </a>
                <p className='tx-blue00 opacity-50'>{trans.address}</p>
                <a className='tx-blue00 opacity-50' href='mailto: info@karandaaz.com.pk'>
                  info@karandaaz.com.pk
                </a>
              </div>
            </div>
            <div className='col-sm-12 col-md-3'>
              <div className='widget py-md-5'>
                <h4 className={`subtitle-style-1 tx-white pb-3`}>{trans.quickLinks.heading}</h4>
                <ul className={`d-flex flex-wrap list-unstyled list-half footer-links mb-0`}>
                  <li>
                    <a className='pb-3 d-block tx-blue30' href={isUrdu ? `/${lang}/` : '/'}>
                      {trans.quickLinks.home}
                    </a>
                  </li>
                  <li>
                    <a className='pb-3 d-block tx-blue30' href={isUrdu ? `/${lang}/${researchUrl}` : researchUrl}>
                      {trans.quickLinks.research}
                    </a>
                  </li>
                  <li>
                    <a className='pb-3 d-block tx-blue30' href={isUrdu ? `/${lang}/${capitalUrl}` : capitalUrl}>
                      {trans.quickLinks.capital}
                    </a>
                  </li>
                  <li>
                    <a className='pb-3 d-block tx-blue30' href={isUrdu ? `/${lang}/${newsmediaUrl}` : newsmediaUrl}>
                      {trans.quickLinks.newsAndMedia}
                    </a>
                  </li>
                  <li>
                    <a className='pb-3 d-block tx-blue30' href={isUrdu ? `/${lang}/${digitalUrl}` : digitalUrl}>
                      {trans.quickLinks.digital}
                    </a>
                  </li>
                  <li>
                    <a className='pb-3 d-block tx-blue30' href={isUrdu ? `/${lang}/${aboutUrl}` : aboutUrl}>
                      {trans.quickLinks.about}
                    </a>
                  </li>
                  <li>
                    <a className='pb-3 d-block tx-blue30' href={isUrdu ? `/${lang}/${innovationUrl}` : innovationUrl}>
                      {trans.quickLinks.innovation}
                    </a>
                  </li>
                  <li>
                    <a className='pb-3 d-block tx-blue30' href={isUrdu ? `/${lang}/${careersUrl}` : careersUrl}>
                      {trans.quickLinks.careers}
                    </a>
                  </li>
                  <li>
                    <a className='pb-3 d-block tx-blue30' href={isUrdu ? `/${lang}/${procurementUrl}` : procurementUrl}>
                      {trans.quickLinks.procurement}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-sm-12 col-md-4'>
              <div className='widget py-md-5'>
                <h4 className='subtitle-style-1 tx-white pb-3'>{trans.corporateLinks.heading}</h4>

                <div className='d-flex'>
                  <ul className='flex-1 list-unstyled list-half footer-links mb-0'>
                    <li>
                      <a className='pb-3 d-block tx-blue30' href={antiFraudCorruptionPolicyUrl}>
                        {trans.corporateLinks.antiFraud}
                      </a>
                    </li>

                    {/* <li>
                    <a className='pb-3 d-block tx-blue30' href='#'>
                      {trans.corporateLinks.codeOfConduct}
                    </a>
                    </li> */}

                    <li>
                      <a
                        className='pb-3 d-block tx-blue30'
                        href={isUrdu ? `/${lang}/${annualReportsUrl}` : annualReportsUrl}
                      >
                        {trans.corporateLinks.annualReports}
                      </a>
                    </li>

                    <li>
                      <a
                        className='pb-3 d-block tx-blue30'
                        href='https://karandaazmain.wpenginepowered.com/wp-content/uploads/2024/09/PCP-Certification-KRN-Second.pdf'
                      >
                        {trans.corporateLinks.npoCertification}
                      </a>
                    </li>
                    <li>
                      <a className='pb-3 d-block tx-blue30' href={isUrdu ? `/${lang}/${sitemapUrl}` : sitemapUrl}>
                        {trans.corporateLinks.siteMap}
                      </a>
                    </li>
                  </ul>
                  <ul className='flex-1 list-unstyled list-half footer-links mb-0'>
                    <li>
                      <a
                        className='pb-3 d-block tx-blue30'
                        href='https://karandaazmain.wpenginepowered.com/wp-content/uploads/2021/08/Final-Flyer-compressed.pdf'
                      >
                        {trans.corporateLinks.safeGuardingPolicy}
                      </a>
                    </li>
                    {/* <li>
                    <a className='pb-3 d-block tx-blue30' href='#'>
                      {trans.corporateLinks.codeOfConduct}
                    </a>
                  </li> */}
                    <li>
                      <a
                        className='pb-3 d-block tx-blue30'
                        href={isUrdu ? `/${lang}/${privacyPolicyUrl}` : privacyPolicyUrl}
                      >
                        {trans.corporateLinks.privacyPolicy}
                      </a>
                    </li>
                    <li>
                      <a className='pb-3 d-block tx-blue30' href={isUrdu ? `/${lang}/${disclaimerUrl}` : disclaimerUrl}>
                        {trans.corporateLinks.disclaimer}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-2'>
              <div className='widget py-md-5'>
                <h4 className='subtitle-style-1 tx-white pb-3'>{trans.compliance.heading}</h4>
                <ul className='d-md-flex flex-wrap list-unstyled footer-links'>
                  <li>
                    <a className='pb-3 d-block tx-blue30' href={isUrdu ? `/${lang}/${statusNtnUrl}` : statusNtnUrl}>
                      {trans.compliance.statusNTN}
                    </a>
                  </li>
                  <li>
                    <a
                      className='pb-3 d-block tx-blue30'
                      href={isUrdu ? `/${lang}/${audtiorLegalUrl}` : audtiorLegalUrl}
                    >
                      {trans.compliance.auditorLegalAdvisor}
                    </a>
                  </li>
                  <li>
                    <a className='pb-3 d-block tx-blue30' href={SECPUrl}>
                      {trans.compliance.secp}
                    </a>
                  </li>
                  <li>
                    <Image
                      src={jamapunji}
                      width={0}
                      height={0}
                      style={{ width: 'auto' }}
                      alt='JamaPunji Logo'
                      className='footer-logo object-fit-contain position-relative'
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='row d-none d-md-block'>
            <hr className='br-blue30'></hr>
          </div>
        </div>
        <div className='container pt-4'>
          <div className='row newsletter'>
            <div className='col-sm-12 col-md-3'>
              <h4 className='subtitle-style-1 tx-white pt-md-2'>{trans.newsletter}</h4>
            </div>
            <div className='col-sm-12 col-md-7'>
              <SubscribeForm formId='4e92e546-4df9-4130-a6ef-81a1827cbb8a' emailFieldId='email_address_0' />
            </div>
            <div className='col-sm-12 col-md-2 d-none d-md-block'>
              <div className='dropdown text-end'>
                <a
                  className={`dropdown-toggle tx-white`}
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  {!isUrdu ? 'English' : 'اردو'}
                  <IoIosArrowDown />
                </a>
                <ul className='dropdown-menu dropdown-menu-end'>
                  <li>
                    <a className='dropdown-item' href={redirectedPathName(alternateLocale)}>
                      {isUrdu ? 'English' : 'اردو'}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='row d-md-none language-dropdown-footer'>
            <div className='col-6'>
              <h4 className='subtitle-style-1 tx-white'>Language</h4>
            </div>
            <div className='col-6'>
              <div className='dropdown text-end'>
                <a
                  className={`dropdown-toggle tx-white`}
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  {!isUrdu ? 'English' : 'اردو'}
                  <IoIosArrowDown />
                </a>
                <ul className='dropdown-menu dropdown-menu-end'>
                  <li>
                    <a className='dropdown-item' href={redirectedPathName(alternateLocale)}>
                      {isUrdu ? 'English' : 'اردو'}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='row copyright mt-4'>
            <div className='col-sm-12 col-md-3'>
              <p className='tx-blue30 tx-small'>Copyrights 2025 Karandaaz Pakistan</p>
            </div>
            <div className='col-sm-12 col-md-6'>
              <p className='tx-blue30 tx-small text-md-center'>
                Non-profit company registered under section 42 of the companies act, 2017
              </p>
            </div>
           <a 
  className='col-sm-12 col-md-3 text-md-end designed-by tx-blue30 tx-small' 
  href='https://www.i-o.digital/' 
  target='_blank' 
  rel='noopener noreferrer'
>
  Developed & Maintained by IO DIGITAL
</a>

          </div>
        </div>
      </footer>
    </div>
  )
}
