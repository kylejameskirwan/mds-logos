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

function BottomBar() {
  return (
    <nav className={styles.bottomBar}>
      <div className={styles.bottomBarContent}>
        <div className={styles.bottomSpacer}></div>
        <p className={styles.bottomDescription}>
          Much modern. Such stack. So data. Wow. <Image src="/doge.gif" layout="fixed" width={20} height={20} alt="Such doge." />
        </p>
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

function TopNav({ searchQuery, setSearchQuery }) {
  const [iconOffset, setIconOffset] = useState({ x: 0, y: 0 });
  const [totalMovement, setTotalMovement] = useState(0);
  const [isPoofing, setIsPoofing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const iconRef = React.useRef(null);
  const lastOffset = React.useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!iconRef.current || isPoofing || isHidden) return;
    
    const rect = iconRef.current.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const iconCenterY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - iconCenterX;
    const distanceY = e.clientY - iconCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // If mouse is within 50px of the icon
    if (distance < 50) {
      // Calculate movement away from mouse (max 5px in any direction)
      const moveX = Math.min(Math.max(-distanceX / 10, -5), 5);
      const moveY = Math.min(Math.max(-distanceY / 10, -5), 5);
      
      // Calculate movement distance from last position
      const movementDelta = Math.sqrt(
        Math.pow(moveX - lastOffset.current.x, 2) + 
        Math.pow(moveY - lastOffset.current.y, 2)
      );
      
      const newTotalMovement = totalMovement + movementDelta;
      setTotalMovement(newTotalMovement);
      
      // Check if we've hit the threshold
      if (newTotalMovement >= 50) {
        setIsPoofing(true);
        
        // After 1 second, hide the icon
        setTimeout(() => {
          setIsPoofing(false);
          setIsHidden(true);
          
          // After 30 seconds, reset everything
          setTimeout(() => {
            setIsHidden(false);
            setTotalMovement(0);
            setIconOffset({ x: 0, y: 0 });
            lastOffset.current = { x: 0, y: 0 };
          }, 30000);
        }, 1000);
      } else {
        setIconOffset({ x: moveX, y: moveY });
        lastOffset.current = { x: moveX, y: moveY };
      }
    } else {
      // Reset to center when mouse is far away
      setIconOffset({ x: 0, y: 0 });
      lastOffset.current = { x: 0, y: 0 };
    }
  };

  const handleMouseLeave = () => {
    if (!isPoofing && !isHidden) {
      setIconOffset({ x: 0, y: 0 });
      lastOffset.current = { x: 0, y: 0 };
    }
  };

  return (
    <nav className={styles.topNav} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className={styles.topNavContent}>
        <div className={styles.topNavLeft}>
          <div 
            ref={iconRef}
            className={styles.topNavIconWrapper}
            style={{
              transform: `translate(${iconOffset.x}px, ${iconOffset.y}px)`,
              transition: 'transform 0.1s ease-out',
              visibility: isHidden ? 'hidden' : 'visible'
            }}
          >
            <Image 
              src={isPoofing ? "/poof.gif" : "/doge.png"} 
              width={24} 
              height={24} 
              alt={isPoofing ? "Poof" : "Doge"} 
              className={styles.topNavIcon}
            />
          </div>
          <h2 className={styles.topNavTitle}>
            Modern Data Stack Logos
          </h2>
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search logos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBar}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <div className={styles.navSpacer}></div>
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
          <CopyableLogo 
            key={logoItem.imgURL} 
            imgURL={logoItem.imgURL} 
            imgType={logoItem.imgType}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const logosByCategory = {
    'Warehouses': [
      {imgURL: "/logos/databricks_icon.png", imgType: 'icon'},
      {imgURL: "/logos/databricks_logo.png", imgType: 'logo'},
      {imgURL: "/logos/snowflake_icon.png", imgType: 'icon'},
      {imgURL: "/logos/snowflake_logo.png", imgType: 'logo'},
      {imgURL: "/logos/aws_redshift_icon.png", imgType: 'icon'},
      {imgURL: "/logos/aws_redshift_logo.png", imgType: 'logo'},
      {imgURL: "/logos/bigquery_icon.png", imgType: 'icon'},
      {imgURL: "/logos/bigquery_logo.png", imgType: 'logo'},
      {imgURL: "/logos/athena_icon.png", imgType: 'icon'},
      {imgURL: "/logos/athena_logo.png", imgType: 'logo'},
      {imgURL: "/logos/synapse_icon.png", imgType: 'icon'},
      {imgURL: "/logos/synapse_logo.png", imgType: 'logo'},
      {imgURL: "/logos/trino_icon.png", imgType: 'icon'},
      {imgURL: "/logos/trino_logo.png", imgType: 'logo'},
      {imgURL: "/logos/alloydb_icon.png", imgType: 'icon'},
      {imgURL: "/logos/alloydb_logo.png", imgType: 'logo'},
      {imgURL: "/logos/db2_icon.png", imgType: 'icon'},
      {imgURL: "/logos/teradata_logo.png", imgType: 'logo'},
      {imgURL: "/logos/vertica_logo.png", imgType: 'logo'},
      {imgURL: "/logos/sap_hana_logo.png", imgType: 'logo'},
      {imgURL: "/logos/netezza_logo.png", imgType: 'logo'},
      {imgURL: "/logos/apache_calcite_icon.png", imgType: 'icon'},
      {imgURL: "/logos/apache_calcite_logo.png", imgType: 'logo'},
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
      {imgURL: "/logos/azure_data_factory_icon.png", imgType: 'icon'},
      {imgURL: "/logos/azure_data_factory_logo.png", imgType: 'logo'},
      {imgURL: "/logos/snaplogic_icon.png", imgType: 'icon'},
      {imgURL: "/logos/snaplogic_logo.png", imgType: 'logo'},
      {imgURL: "/logos/ibm_datastage_logo.png", imgType: 'logo'},
      {imgURL: "/logos/matillion_logo.png", imgType: 'logo'},
    ],
    'Databases': [
      {imgURL: "/logos/postgres_icon.png", imgType: 'icon'},
      {imgURL: "/logos/postgres_logo.png", imgType: 'logo'},
      {imgURL: "/logos/mysql_logo.png", imgType: 'logo'},
      {imgURL: "/logos/sqlserver_logo.png", imgType: 'logo'},
      {imgURL: "/logos/oracle_icon.png", imgType: 'icon'},
      {imgURL: "/logos/oracle_logo.png", imgType: 'logo'},
      {imgURL: "/logos/aws_aurora_icon.png", imgType: 'icon'},
    ],
    'Observability': [
      {imgURL: "/logos/bigeye_icon.png", imgType: 'icon'},
      {imgURL: "/logos/bigeye_logo.png", imgType: 'logo'},
    ],
    'Catalogs': [
      {imgURL: "/logos/amundsen_icon.png", imgType: 'icon'},
      {imgURL: "/logos/amundsen_logo.png", imgType: 'logo'},
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
      {imgURL: "/logos/azure_powerbi_icon.png", imgType: 'icon'},
      {imgURL: "/logos/azure_powerbi_logo.png", imgType: 'logo'},
      {imgURL: "/logos/cognos_logo.png", imgType: 'logo'},
      {imgURL: "/logos/looker_icon.png", imgType: 'icon'},
      {imgURL: "/logos/looker_logo.png", imgType: 'logo'},
      {imgURL: "/logos/qlik_logo.png", imgType: 'logo'},
      {imgURL: "/logos/sigma_icon.png", imgType: 'icon'},
      {imgURL: "/logos/sigma_logo.png", imgType: 'logo'},
      {imgURL: "/logos/thoughtspot_icon.png", imgType: 'icon'},
      {imgURL: "/logos/thoughtspot_logo.png", imgType: 'logo'},
    ],
    'Streaming': [
      {imgURL: "/logos/kafka_icon.png", imgType: 'icon'},
      {imgURL: "/logos/kafka_logo.png", imgType: 'logo'},
      {imgURL: "/logos/confluent_icon.png", imgType: 'icon'},
      {imgURL: "/logos/confluent_logo.png", imgType: 'logo'},
    ],
    'Storage': [
      {imgURL: "/logos/aws_s3_icon.png", imgType: 'icon'},
      {imgURL: "/logos/aws_s3_logo.png", imgType: 'logo'},
    ],
    'Real-time Analytics': [
      {imgURL: "/logos/clickhouse_icon.png", imgType: 'icon'},
      {imgURL: "/logos/clickhouse_logo.png", imgType: 'logo'},
      {imgURL: "/logos/rockset_logo.png", imgType: 'logo'},
    ],
  };

  const filteredLogosByCategory = {};
  
  if (searchQuery) {
    Object.entries(logosByCategory).forEach(([category, logos]) => {
      const filteredLogos = logos.filter(logo => {
        const fileName = logo.imgURL.toLowerCase();
        const query = searchQuery.toLowerCase();
        return fileName.includes(query) || category.toLowerCase().includes(query);
      });
      
      if (filteredLogos.length > 0) {
        filteredLogosByCategory[category] = filteredLogos;
      }
    });
  } else {
    Object.assign(filteredLogosByCategory, logosByCategory);
  }
  
  const categories = Object.keys(filteredLogosByCategory);

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

      <TopNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BottomBar />

      <main className={styles.main}>
        <div className={styles.sections}>
          {Object.entries(filteredLogosByCategory).map(([category, logos]) => (
            <LogoSection 
              key={category} 
              title={category} 
              logos={logos}
            />
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
