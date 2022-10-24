import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import {  } from "./merkle_tree";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

  const { MerkleTree } = require('merkletreejs');
  const keccak256 = require('keccak256');
  
  const whitelistAddresses = [
      '0x3532Bf9FF4900f32DA9037b2cd0188A0419BB7b1',
      '0x119F8903bE1Fc789cDc7827317143f1c071f22F5',
      '0x1cD97FFcF7aEFbCe3b59e5816d778c0117f2d763',
      '0x0a290c8cE7C35c40F4F94070a9Ed592fC85c62B9',
      '0x43Be076d3Cd709a38D2f83Cd032297a194196517',
      '0xC7FaB03eecA24CcaB940932559C5565a4cE9cFFb',
      '0xE4336D25e9Ca0703b574a6fd1b342A4d0327bcfa',
      '0xeDcB8a28161f966C5863b8291E80dDFD1eB78491',
      '0x77cbd0fa30F83a249da282e9fE90A86d7936FdE7',
      '0xc39F9406284CcAeB426D0039a3F6ADe14573BaFe',
      '0x16Beb6b55F145E4269279B82c040B7435f1088Ee',
      '0x900b2909127Dff529f8b4DB3d83b957E6aE964c2',
      '0xeA2A799793cE3D2eC6BcD066563f385F25401e95',
  ];
  const leafNodes = whitelistAddresses.map(address => keccak256(address));
  const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const root = tree.getRoot();
  let isProof = true;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 20px;
  border: none;
  background-color: var(--secondary2);
  padding: 10px;
  font-size: 30px;
  font-weight: bold;
  color: var(--secondary2-text);
  width: 200px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledButton2 = styled.button`
  padding: 10px;
  border-radius: 20px;
  border: none;
  background-color: var(--secondary2-text);
  padding: 10px;
  font-size: 30px;
  font-weight: bold;
  color: var(--secondary2);
  width: 200px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;
export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
    width: 75%;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 500px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
 
`;

export const StyledPFP = styled.img`
  width: 300px;
  @media (min-width: 767px) {
    width: 500px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
 
`;

export const Styledicon = styled.img`
  display: flex;
  flex: 1;  
  width: 50px;
  padding: 5x;
  flex-direction: column;
  @media (min-width: 767px) {
    width: 50px;
    flex-direction: row;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary-text);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Whitelist get 1 Freemint than 0.008 per`);
  const [mintAmount, setmintAmount] = useState(1);
  const [freemint, setFreemint] = useState(false);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    TWITTER_LINK:"",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const getMintedFree = async () => {
    if (blockchain.smartContract !== null){
    let res = await blockchain.smartContract.methods
    .freeMinted(blockchain.account)
    .call();
    console.log(res);
    setFreemint(res);}
  };
  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    if (freemint == false) {
      totalCostWei = String(cost * mintAmount);
    }
    let totalGasLimit = String(gasLimit + mintAmount * 120000);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    console.log(blockchain)
    blockchain.smartContract.methods
      .pubMint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  
  const claimWLNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let leaf = keccak256(blockchain.account);
    let proof = tree.getHexProof(leaf);
    if (freemint == false) {
      totalCostWei = String(cost * mintAmount - cost);
    }
    let totalGasLimit = String(gasLimit + mintAmount * 120000);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    console.log(blockchain)
    blockchain.smartContract.methods
      .preMint(mintAmount,proof)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  const decrementmintAmount = () => {
    let newmintAmount = mintAmount - 1;
    if (newmintAmount < 1) {
      newmintAmount = 1;
    }
    setmintAmount(newmintAmount);
  };

  const incrementmintAmount = () => {
    let newmintAmount = mintAmount + 1;
    if (newmintAmount > 3) {
      newmintAmount = 3;
    }
    setmintAmount(newmintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <s.Container flex={1} jc={"space-around"} ai={"center"} fd={"row"}  >
        <a href={CONFIG.MARKETPLACE_LINK}>
        <StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
        </a>
        <a href={CONFIG.MARKETPLACE_LINK}>
        <Styledicon alt={"OPENSEA"} src={"/config/images/opensea.png"} />
      </a> 
      <a href={CONFIG.SCAN_LINK}>
        <Styledicon alt={"Etherscan"} src={"/config/images/etherscan.png"} />
      </a> 
      <a href={CONFIG.TWITTER_LINK}>
        <Styledicon alt={"TWITTER"} src={"/config/images/twitter.png"} />
      </a> 
      </s.Container>
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 2 }} test>
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"} >
        <StyledPFP style={{
              backgroundColor: "var(--accent)",
              padding: 2,
              borderRadius: 24,
              border: "2px dashed var(--secondary)",
            }}
            alt={"PFP"} src={"/config/images/pfp.png"} />
          </s.Container>
          <s.SpacerMedium />
          <s.Container
            flex={1}
            jc={"center"}
            ai={"npcenter"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px dashed var(--secondary)",
              boxShadow: "0px 4px 11px 2px rgba(0,0,0,0.3)",
            }}
          >            
          <span
          style={{
            textAlign: "center",
          }}
        >
        </span>
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 60,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              {data.totalSupply} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </StyledLink>
            </s.TextDescription>
            {
              console.log(isProof)
            }
            {!isProof ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                you are not on Whitelist.
                </s.TextTitle>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center",fontSize: 25, color: "var(--accent-text)" }}
                >
                </s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT WALLET
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                     {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementmintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementmintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.Container>
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                    {claimingNft ? "MINTING " : "Public MINT"}
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerMedium />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
          </s.TextDescription>
        </s.Container>
        <ResponsiveWrapper flex={1} style={{ padding: 2 }} test>
          <s.Container
            flex={1}
            jc={"center"}
            ai={"npcenter"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 22,
              borderRadius: 24,
              border: "4px dashed var(--secondary)",
              boxShadow: "0px 4px 11px 2px rgba(0,0,0,0.2)",
            }}
            > 
            <s.TextDescription style={{ textAlign: "center",fontSize: 25, color: "var(--accent-text)" }}>
            Fossil-fuel protestors have been arrested for splashing a tin of Heinz tomato soup across Vincent van Gogh’s iconic “Sunflowers” painting inside the National Gallery in London.

Anna Holland, 20, and Phoebe Plummer, 21, carried out the act of vandalism inside the museum on Friday morning before gluing themselves to the wall beneath the 1889 artwork valued at $85 million.
Following her arrest, Plummer appeared unapologetic, telling local media: “Is art worth more than life? More than food? More than justice?”

She said the soup was chosen as the damaging liquid of choice because Brits won’t even be able to heat up food this winter as the country faces a cost of living crisis.

“The cost of living crisis is driven by fossil fuels,” she proclaimed. “Everyday life has become unaffordable for millions of cold, hungry families — they can’t even afford to heat a tin of soup.”

“Meanwhile, crops are failing, and people are dying in supercharged monsoons, massive wildfires and endless droughts caused by climate breakdown,” Plummer added.            </s.TextDescription>
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>
        <s.SpacerLarge />
        <s.Container flex={1} jc={"center"} ai={"center"} >
        <StyledPFP style={{
              backgroundColor: "var(--accent)",
              padding: 2,
              borderRadius: 24,
              border: "2px dashed var(--secondary)",
            }}/>
            <iframe width="80%" height="315" src="https://www.youtube.com/embed/LTdquzu-BXg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </s.Container>
          <s.SpacerLarge />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
          </s.TextDescription>
        </s.Container>
        <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
        Shout out to Protesters throw soup on Van Gogh’s iconic ‘Sunflowers’ painting.
        </s.TextDescription>
      </s.Container>
    </s.Screen>
  );
}

export default App;
