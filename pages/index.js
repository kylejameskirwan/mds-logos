import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import html2canvas from 'html2canvas';

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
          Much modern. Such stack. So data. Wow. <img className={styles.doge} src="/doge.gif" />
        </p>
        <p className={styles.smalltext}>
          On Chrome click an image to copy to clipboard. On other browsers right click and copy image.
        </p>

        <div className={styles.grid}>

          <div onClick={(e => copyImage(e, "/logos/airflow_icon.png"))} className={styles.card}>
            <img className={styles.iconimg} src="/logos/airflow_icon.png"></img>
          </div>

          <a onClick={(e => copyImage(e, "/logos/airflow_logo.png"))} className={styles.card}>
            <img className={styles.logoimg} src="/logos/airflow_logo.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/amundsen_icon.png"))} className={styles.card}>
            <img className={styles.iconimg} src="/logos/amundsen_icon.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/amundsen_logo.png"))} className={styles.card}>
            <img className={styles.logoimg} src="/logos/amundsen_logo.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/bigeye_icon.png"))} className={styles.card}>
            <img className={styles.iconimg} src="/logos/bigeye_icon.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/bigeye_logo.png"))} className={styles.card}>
            <img className={styles.logoimg} src="/logos/bigeye_logo.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/census_icon.png"))} className={styles.card}>
            <img className={styles.iconimg} src="/logos/census_icon.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/census_logo.png"))} className={styles.card}>
            <img className={styles.logoimg} src="/logos/census_logo.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/databricks_icon.png"))} className={styles.card}>
            <img className={styles.iconimg} src="/logos/databricks_icon.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/databricks_logo.png"))} className={styles.card}>
            <img className={styles.logoimg} src="/logos/databricks_logo.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/dbt_icon.png"))} className={styles.card}>
            <img className={styles.iconimg} src="/logos/dbt_icon.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/dbt_logo.png"))} className={styles.card}>
            <img className={styles.logoimg} src="/logos/dbt_logo.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/fivetran_icon.png"))} className={styles.card}>
            <img className={styles.iconimg} src="/logos/fivetran_icon.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/fivetran_logo.png"))} className={styles.card}>
            <img className={styles.logoimg} src="/logos/fivetran_logo.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/prefect_icon.png"))} className={styles.card}>
            <img className={styles.iconimg} src="/logos/prefect_icon.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/prefect_logo_black.png"))} className={styles.card}>
            <img className={styles.logoimg} src="/logos/prefect_logo_black.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/snowflake_icon.png"))} className={styles.card}>
            <img className={styles.iconimg} src="/logos/snowflake_icon.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/snowflake_logo.png"))} className={styles.card}>
            <img className={styles.logoimg} src="/logos/snowflake_logo.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/stemma_logo_black.png"))} className={styles.card}>
            <img className={styles.logoimg} src="/logos/stemma_logo_black.png"></img>
          </a>

          <a onClick={(e => copyImage(e, "/logos/stitch_logo.png"))} className={styles.card}>
            <img className={styles.logoimg} src="/logos/stitch_logo.png"></img>
          </a>

        </div>

        <div className={styles.footer}>
          <p className={styles.smalltext}> 
            SVGs and variants for dark backgrounds may or may not be coming soon. Feel like we're missing a logo? Fire up Twitter and/or LinkedIn and complain about it for some easy likes!
          </p>
        </div>
      </main>
    </div>
  )
}
