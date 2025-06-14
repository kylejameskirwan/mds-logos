import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';

function CopyableLogo({ imgURL, imgType }) {
  const [feedback, setFeedback] = useState('');

  const copyImage = async (e) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.write) {
        const response = await fetch(imgURL);
        const blob = await response.blob();
        const item = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
        setFeedback('Copied!');
        setTimeout(() => setFeedback(''), 2000);
      } else {
        setFeedback('Clipboard API not supported');
        setTimeout(() => setFeedback(''), 2000);
      }
    } catch (err) {
      setFeedback('Failed to copy');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  return (
    <div 
      className={styles.cardWrapper}
      onClick={copyImage} 
      onMouseEnter={(e) => {
        const tooltip = e.currentTarget.querySelector(`.${styles.tooltip}`);
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = 1;
      }}
      onMouseLeave={(e) => {
        const tooltip = e.currentTarget.querySelector(`.${styles.tooltip}`);
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = 0;
      }}
    >
      <div className={styles.card}>
        <div className={styles.cardContainer}>
          <Image src={imgURL} layout="fill" alt="A wild logo appears." className={styles.iconimg}/>
          <span className={styles.tooltip}>{feedback || 'Click to copy'}</span>
        </div>
      </div>
    </div>
  );
}

function Navigation({ categories }) {
  return (
    <nav className={styles.navigation}>
      <div className={styles.navContent}>
        <ul className={styles.navList}>
          {categories.map(category => (
            <li key={category} className={styles.navItem}>
              <a href={`#${category.toLowerCase().replace(/\s+/g, '-')}`} className={styles.navLink}>
                {category}
              </a>
            </li>
          ))}
        </ul>
        <a 
          href="https://buymeacoffee.com/jimmiesrustlin" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.buyTokens}
        >
          Buy me tokens
        </a>
      </div>
    </nav>
  );
}

function LogoSection({ title, logos }) {
  const sectionId = title.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={styles.section} id={sectionId}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionGrid}>
        {logos.map(logoItem => (
          <CopyableLogo key={logoItem.imgURL} imgURL={logoItem.imgURL} imgType={logoItem.imgType} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const logosByCategory = {
    'Warehouses': [
      {imgURL: "/logos/databricks_icon.png", imgType: 'icon'},
      {imgURL: "/logos/databricks_logo.png", imgType: 'logo'},
      {imgURL: "/logos/snowflake_icon.png", imgType: 'icon'},
      {imgURL: "/logos/snowflake_logo.png", imgType: 'logo'},
      {imgURL: "/logos/aws_redshift_icon.png", imgType: 'icon'},
      {imgURL: "/logos/aws_redshift_logo.png", imgType: 'logo'},
      {imgURL: "/logos/clickhouse_icon.png", imgType: 'icon'},
      {imgURL: "/logos/clickhouse_logo.png", imgType: 'logo'},
      {imgURL: "/logos/bigquery_icon.png", imgType: 'icon'},
      {imgURL: "/logos/bigquery_logo.png", imgType: 'logo'},
    ],
    'Transformation': [
      {imgURL: '/logos/airflow_icon.png', imgType: 'icon'},
      {imgURL: '/logos/airflow_logo.png', imgType: 'logo'},
      {imgURL: "/logos/census_icon.png", imgType: 'icon'},
      {imgURL: "/logos/census_logo.png", imgType: 'logo'},
      {imgURL: "/logos/stitch_icon.png", imgType: 'icon'},
      {imgURL: "/logos/stitch_logo.png", imgType: 'logo'},
      {imgURL: "/logos/dagster_icon.png", imgType: 'icon'},
      {imgURL: "/logos/dagster_logo.png", imgType: 'logo'},
      {imgURL: "/logos/dbt_icon.png", imgType: 'icon'},
      {imgURL: "/logos/dbt_logo.png", imgType: 'logo'},
      {imgURL: "/logos/fivetran_icon.png", imgType: 'icon'},
      {imgURL: "/logos/fivetran_logo.png", imgType: 'logo'},
      {imgURL: "/logos/prefect_icon.png", imgType: 'icon'},
      {imgURL: "/logos/prefect_logo_black.png", imgType: 'logo'},
    ],
    'Databases': [
      {imgURL: "/logos/postgres_icon.png", imgType: 'icon'},
      {imgURL: "/logos/postgres_logo.png", imgType: 'logo'},
      {imgURL: "/logos/mysql_logo.png", imgType: 'logo'},
      {imgURL: "/logos/sqlserver_logo.png", imgType: 'logo'},
    ],
    'Observability': [
      {imgURL: "/logos/bigeye_icon.png", imgType: 'icon'},
      {imgURL: "/logos/bigeye_logo.png", imgType: 'logo'},
    ],
    'Catalogs': [
      {imgURL: "/logos/amundsen_icon.png", imgType: 'icon'},
      {imgURL: "/logos/amundsen_logo.png", imgType: 'logo'},
      {imgURL: "/logos/stemma_logo_black.png", imgType: 'logo'},
      {imgURL: "/logos/alation_icon.png", imgType: 'icon'},
      {imgURL: "/logos/alation_logo.png", imgType: 'logo'},
      {imgURL: "/logos/collibra_icon.png", imgType: 'icon'},
      {imgURL: "/logos/collibra_logo.png", imgType: 'logo'},
      {imgURL: "/logos/atlan_icon.png", imgType: 'icon'},
      {imgURL: "/logos/atlan_logo.png", imgType: 'logo'},
    ],
    'Analytics': [
      {imgURL: "/logos/tableau_icon.png", imgType: 'icon'},
      {imgURL: "/logos/tableau_logo.png", imgType: 'logo'},
    ],
    'Streaming': [
      {imgURL: "/logos/kafka_icon.png", imgType: 'icon'},
      {imgURL: "/logos/kafka_logo.png", imgType: 'logo'},
      {imgURL: "/logos/confluent_icon.png", imgType: 'icon'},
      {imgURL: "/logos/confluent_logo.png", imgType: 'logo'},
    ],
    'Other': [
      {imgURL: "/logos/rockset_logo.png", imgType: 'logo'},
      {imgURL: "/logos/aws_s3_icon.png", imgType: 'icon'},
      {imgURL: "/logos/aws_s3_logo.png", imgType: 'logo'},
    ],
  };

  const categories = Object.keys(logosByCategory);

  return (
    <div className={styles.container}>
      <Head>
        <title>MDS Logos</title>
        <meta name="description" content="You need logos. We got logos." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="kylejameskirwan"
        data-description="Support me on Buy me a coffee!"
        data-message="You're actually buying me tokens, but we can both pretend it's for coffee."
        data-color="#5F7FFF"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
        strategy="lazyOnload"
      />

      <Navigation categories={categories} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Modern Data <br/> Stack Logos
        </h1>

        <p className={styles.description}>
          Much modern. Such stack. So data. Wow. <Image src="/doge.gif" layout="fixed" width={25} height={25} alt="Such doge." />
        </p>

        <div className={styles.sections}>
          {Object.entries(logosByCategory).map(([category, logos]) => (
            <LogoSection key={category} title={category} logos={logos} />
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.smalltext}> 
            SVGs and variants for dark backgrounds may or may not be coming soon.
          </p>
        </div>
      </main>
    </div>
  );
}
