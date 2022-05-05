import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  const copyImage = async (e, imgURL) => {
    try {
      const data = await fetch(imgURL);
      const blob = await data.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      console.log('Image copied.');
    } catch (err) {
      console.error(err.name, err.message);
    }  
  }

  const logos = [
    {imgURL: '/logos/airflow_icon.png', imgType: 'icon'},
    {imgURL: '/logos/airflow_logo.png', imgType: 'logo'},
    {imgURL: "/logos/amundsen_icon.png", imgType: 'icon'},
    {imgURL: "/logos/amundsen_logo.png", imgType: 'logo'},
    {imgURL: "/logos/bigeye_icon.png", imgType: 'icon'},
    {imgURL: "/logos/bigeye_logo.png", imgType: 'logo'},
    {imgURL: "/logos/census_icon.png", imgType: 'icon'},
    {imgURL: "/logos/census_logo.png", imgType: 'logo'},
    {imgURL: "/logos/confluent_icon.png", imgType: 'icon'},
    {imgURL: "/logos/confluent_logo.png", imgType: 'logo'},
    {imgURL: "/logos/dagster_icon.png", imgType: 'icon'},
    {imgURL: "/logos/dagster_logo.png", imgType: 'logo'},
    {imgURL: "/logos/databricks_icon.png", imgType: 'icon'},
    {imgURL: "/logos/databricks_logo.png", imgType: 'logo'},
    {imgURL: "/logos/dbt_icon.png", imgType: 'icon'},
    {imgURL: "/logos/dbt_logo.png", imgType: 'logo'},
    {imgURL: "/logos/fivetran_icon.png", imgType: 'icon'},
    {imgURL: "/logos/fivetran_logo.png", imgType: 'logo'},
    {imgURL: "/logos/kafka_icon.png", imgType: 'icon'},
    {imgURL: "/logos/kafka_logo.png", imgType: 'logo'},
    {imgURL: "/logos/postgres_icon.png", imgType: 'icon'},
    {imgURL: "/logos/postgres_logo.png", imgType: 'logo'},
    {imgURL: "/logos/prefect_icon.png", imgType: 'icon'},
    {imgURL: "/logos/prefect_logo_black.png", imgType: 'logo'},
    {imgURL: "/logos/aws_redshift_icon.png", imgType: 'icon'},
    {imgURL: "/logos/aws_redshift_logo.png", imgType: 'logo'},
    {imgURL: "/logos/rockset_logo.png", imgType: 'logo'},
    {imgURL: "/logos/aws_s3_icon.png", imgType: 'icon'},
    {imgURL: "/logos/aws_s3_logo.png", imgType: 'logo'},
    {imgURL: "/logos/snowflake_icon.png", imgType: 'icon'},
    {imgURL: "/logos/snowflake_logo.png", imgType: 'logo'},
    {imgURL: "/logos/stemma_logo_black.png", imgType: 'logo'},
    {imgURL: "/logos/stitch_icon.png", imgType: 'icon'},
    {imgURL: "/logos/stitch_logo.png", imgType: 'logo'},
    {imgURL: "/logos/tableau_icon.png", imgType: 'icon'},
    {imgURL: "/logos/tableau_logo.png", imgType: 'logo'},
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>MDS Logos</title>
        <meta name="description" content="You need logos. We got logos." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Modern Data <br/> Stack Logos
        </h1>

        <p className={styles.description}>
          Much modern. Such stack. So data. Wow. <Image src="/doge.gif" layout="fixed" width={25} height={25} alt="Such doge." />
        </p>

        <div className={styles.grid}>

          {logos.map(function(logoItem) {
            const imgURL = logoItem.imgURL;
            const imgType = logoItem.imgType;
            return (
              <div key={logoItem.imgURL} onClick={(e => copyImage(e, {imgURL}))} className={styles.card}>
                <div className={styles.cardContainer}>
                  <Image className={styles.iconimg} src={imgURL} layout="fill" alt="A wild logo appears."/>
                </div>
              </div> 
            )
          })}

        </div>

        <div className={styles.footer}>
          <p className={styles.smalltext}> 
            SVGs and variants for dark backgrounds may or may not be coming soon.
          </p>
        </div>
      </main>
    </div>
  )
}
