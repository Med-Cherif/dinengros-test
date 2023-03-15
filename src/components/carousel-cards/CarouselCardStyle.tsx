import styled, { keyframes } from "styled-components";

const shrink = keyframes`
  0% {
    width: 110%;
    height: 110%;
  }
  100% {
    width: 100%;
    height: 100%;
}
`;

export const StyledCarouselCard1 = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 1rem 2rem;
  gap: 3rem;

  .title {
    font-size: 38px;
    margin-top: 0px;
    margin-bottom: 1.35rem;
    line-height: 1.2;
  }

  .image-holder {
    position: relative;
    //   width: 50%;
    display: none;

    img {
      width: 100%;
      max-height: 370px;
      object-fit: cover;
    }
  }

  @media only screen and (max-width: 900px) {
    margin-left: 0px;
    padding-left: 0px;

    .title {
      font-size: 32px;
    }
  }

  @media only screen and (max-width: 425px) {
    .title {
      font-size: 16px;
    }
    .title + * {
      font-size: 13px;
    }
    .button-link {
      padding: 0.66rem 0.95rem;
      font-size: 13px;
    }
  }
`;

export const StyledCarouselCard2 = styled.div`
  width: 100%;
  min-height: 500px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 6rem;
  gap: 3rem;
  background-image: ${({ customBackground }) =>
    customBackground ? `url(${customBackground})` : ""};
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  .title {
    font-size: 50px;
    margin-top: 0px;
    margin-bottom: 1.35rem;
    line-height: 1.2;
  }

  .carousel-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    overflow: hidden;

    img,
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    img {
      width: 110%;
      height: 110%;
      animation: ${shrink} 5s infinite alternate;
    }
  }

  .card-info-holder {
    /* width: 100%;
    max-width: 600px; */
    /* background-color: rgba(0, 0, 0, .2); */
    /* backdrop-filter: blur(4px);
    padding: 2rem; */
  }

  @media only screen and (max-width: 900px) {
    margin-left: 0px;
    padding-left: 0px;

    .title {
      font-size: 32px;
    }
  }

  @media only screen and (max-width: 425px) {
    .title {
      font-size: 16px;
    }
    .title + * {
      font-size: 13px;
    }
    .button-link {
      padding: 0.66rem 0.95rem;
      font-size: 13px;
    }
  }
`;
