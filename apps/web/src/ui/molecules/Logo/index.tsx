import Link from "next/link";

import * as S from "./styles";

export type LogoProps = {
  size?: "Small" | "Medium" | "Large";
  href?: string;
};
export const Logo = ({ href = "#", size }: LogoProps) => (
  <Link href={href}>
    <S.Link size={size}>
      <S.Svg
        xmlns="http://www.w3.org/2000/svg"
        width="118.516"
        height="24.013"
        viewBox="0 0 118.516 24.013"
      >
        <g id="Logo" transform="translate(0 -14.834)" stroke="none">
          <S.LogoIcon
            id="Logo-Icon"
            transform="translate(0 14.834)"
            stroke="none"
          >
            <g
              id="Icon-X"
              data-name="Group 1"
              transform="translate(24.291 24.013) rotate(180)"
              stroke="none"
            >
              <path
                id="Path_1"
                data-name="Path 1"
                d="M0,0V3.3l5.645,5.7h3.4Z"
                transform="translate(0 3.242)"
                stroke="none"
              />
              <path
                id="Path_3"
                data-name="Path 3"
                d="M9.045,8.993V5.7L3.4,0H0Z"
                transform="translate(15.245 11.501)"
                stroke="none"
              />
              <path
                id="Path_4"
                data-name="Path 4"
                d="M9.045,0V3.3L3.4,8.993,9.045,14.64v3.443L0,8.993Z"
                transform="translate(21.326 14.968) rotate(90)"
                stroke="none"
              />
              <path
                id="Path_5"
                data-name="Path 5"
                d="M9.045,18.083v-3.3L3.4,9.09,9.045,3.443V0L0,9.09Z"
                transform="translate(2.688 9.045) rotate(-90)"
                stroke="none"
              />
            </g>
            <circle
              id="Ellipse"
              data-name="Ellipse 1"
              cx="1.5"
              cy="1.5"
              r="1.5"
              transform="translate(10.686 11.068)"
              fill="#e6007a"
              stroke="none"
            />
          </S.LogoIcon>
          <S.LogoText
            id="Logo-Text"
            transform="translate(31.955 15.951)"
            stroke="none"
          >
            <path
              id="Path_8137"
              data-name="Path 8137"
              d="M280.058-12.432a1.608,1.608,0,0,1,1.33.6,1.681,1.681,0,0,1,.307,1.449,2.51,2.51,0,0,1-.921,1.449,2.483,2.483,0,0,1-1.568.563,1.6,1.6,0,0,1-1.313-.563,1.605,1.605,0,0,1-.256-1.449,2.515,2.515,0,0,1,.869-1.449A2.333,2.333,0,0,1,280.058-12.432Z"
              transform="translate(-195.179 25.334)"
              fill="#e6007a"
              stroke="none"
            />
            <path
              id="Path_8136"
              data-name="Path 8136"
              d="M14.558-41.718h-.9a.939.939,0,0,1-.821-.348.937.937,0,0,1-.124-.821,1.412,1.412,0,0,1,.46-.784,1.348,1.348,0,0,1,.958-.361h.9l.921-4.23a1.358,1.358,0,0,1,.56-.871,1.583,1.583,0,0,1,.908-.3,1.075,1.075,0,0,1,.734.274.89.89,0,0,1,.187.9l-.921,4.23h.9a2.766,2.766,0,0,0,1.232-.274,3.835,3.835,0,0,0,1-.7,3.792,3.792,0,0,0,.722-.97,4.452,4.452,0,0,0,.411-1.12,4.264,4.264,0,0,0,.062-1.07,2.356,2.356,0,0,0-.261-.945,1.765,1.765,0,0,0-.647-.684,2,2,0,0,0-1.07-.261H15.006a5.131,5.131,0,0,0-.983.1,3.4,3.4,0,0,0-.97.348,2.831,2.831,0,0,0-.8.634,2.112,2.112,0,0,0-.46.958,1.5,1.5,0,0,0,.124,1.045,6.73,6.73,0,0,0,.523.846.971.971,0,0,1,.249.921,1.5,1.5,0,0,1-.485.8,1.28,1.28,0,0,1-.883.348,1.219,1.219,0,0,1-.771-.274,3.821,3.821,0,0,1-1.02-1.592,4,4,0,0,1-.1-2.09,4.757,4.757,0,0,1,.821-1.854,5.753,5.753,0,0,1,1.431-1.368,6.457,6.457,0,0,1,1.829-.846,7.174,7.174,0,0,1,1.991-.286h4.6a4.42,4.42,0,0,1,2.152.473,3.443,3.443,0,0,1,1.319,1.232,3.936,3.936,0,0,1,.547,1.7,6.515,6.515,0,0,1-.112,1.916,7.515,7.515,0,0,1-.746,1.953,6.9,6.9,0,0,1-1.306,1.7,6.319,6.319,0,0,1-1.829,1.207,5.616,5.616,0,0,1-2.289.46h-.9L16.7-40.548a5.907,5.907,0,0,1-.411,1.169,3.433,3.433,0,0,1-.672.958,2.953,2.953,0,0,1-1,.647,3.673,3.673,0,0,1-1.381.236,4.332,4.332,0,0,1-1.132-.174,1.559,1.559,0,0,1-.983-.846,1.025,1.025,0,0,1-.149-.746,1.454,1.454,0,0,1,.547-.821,1.484,1.484,0,0,1,.921-.323,1.044,1.044,0,0,1,.8.348.548.548,0,0,0,.473.249.447.447,0,0,0,.4-.286,5.75,5.75,0,0,0,.348-1.182Zm8.957-.722a5.872,5.872,0,0,1,.8-1.916,6.747,6.747,0,0,1,1.381-1.568,6.754,6.754,0,0,1,1.791-1.07,5.292,5.292,0,0,1,2-.4,4.224,4.224,0,0,1,1.866.4,3.735,3.735,0,0,1,1.344,1.07,3.89,3.89,0,0,1,.722,1.568,4.4,4.4,0,0,1-.025,1.916,5.735,5.735,0,0,1-.8,1.9,6.858,6.858,0,0,1-1.381,1.555,6.5,6.5,0,0,1-1.791,1.057,5.5,5.5,0,0,1-2.028.386,4.279,4.279,0,0,1-1.841-.386,3.62,3.62,0,0,1-1.344-1.057,3.889,3.889,0,0,1-.722-1.555A4.349,4.349,0,0,1,23.515-42.439Zm7.564,0a2.48,2.48,0,0,0,.025-1.045,2.079,2.079,0,0,0-.386-.871A1.991,1.991,0,0,0,30-44.94a2.221,2.221,0,0,0-.983-.211,2.828,2.828,0,0,0-1.07.211,3.456,3.456,0,0,0-.958.585,3.771,3.771,0,0,0-.746.871,3.372,3.372,0,0,0-.435,1.045,2.173,2.173,0,0,0,.348,1.891,2.042,2.042,0,0,0,1.717.771,2.828,2.828,0,0,0,1.07-.211,3.624,3.624,0,0,0,.958-.572,3.646,3.646,0,0,0,.746-.846A3.226,3.226,0,0,0,31.079-42.439Zm8.634-9.43q-.075,0-.112.149l-.087.348-2.289,10.8q-.05.2-.1.411a2.448,2.448,0,0,1-.1.336,1.389,1.389,0,0,1,.485-.336,1.327,1.327,0,0,1,.46-.087.922.922,0,0,1,.7.286.752.752,0,0,1,.149.759,1.443,1.443,0,0,1-.373.722,2.494,2.494,0,0,1-1.033.759,3.129,3.129,0,0,1-1.033.187,1.631,1.631,0,0,1-1.443-.61,2.691,2.691,0,0,1-.149-2L37.175-51.3a5.724,5.724,0,0,1,.448-1.443,2.721,2.721,0,0,1,.634-.858,1.943,1.943,0,0,1,.846-.423,4.947,4.947,0,0,1,1.107-.112h.2a.776.776,0,0,1,.684.348.935.935,0,0,1,.137.771,1.444,1.444,0,0,1-.473.771,1.224,1.224,0,0,1-.846.373Zm4.628,12.192a7.177,7.177,0,0,1-.423-1,2.157,2.157,0,0,1-.075-1.169,1.49,1.49,0,0,1,.56-.834,8.7,8.7,0,0,1,1.057-.684,3.156,3.156,0,0,0,.858-.7,1.812,1.812,0,0,0,.411-.722q.075-.373-.572-.373a2.662,2.662,0,0,0-1,.2,2.872,2.872,0,0,0-.933.622,4.7,4.7,0,0,0-.8,1.057,5.024,5.024,0,0,0-.535,1.505l-.647,3.11a1.265,1.265,0,0,1-.56.846,1.644,1.644,0,0,1-.883.274.986.986,0,0,1-.709-.274.854.854,0,0,1-.162-.846L42.6-51.2a5.95,5.95,0,0,1,.448-1.456,2.691,2.691,0,0,1,.634-.871,1.943,1.943,0,0,1,.834-.423,4.782,4.782,0,0,1,1.095-.112h.224a.739.739,0,0,1,.684.348,1.078,1.078,0,0,1,.137.771,1.648,1.648,0,0,1-.46.759,1.145,1.145,0,0,1-.834.361h-.224q-.075,0-.112.149t-.087.373L43.794-46a6.505,6.505,0,0,1,1.568-1.02,3.7,3.7,0,0,1,1.518-.373,2.421,2.421,0,0,1,1.791.672,1.78,1.78,0,0,1,.423,1.767,4.1,4.1,0,0,1-1.057,1.941,5.188,5.188,0,0,1-1.9,1.319q.075.124.224.435t.311.634a3.838,3.838,0,0,0,.336.56q.174.236.323.236a3.789,3.789,0,0,1,.448-.286,1.069,1.069,0,0,1,.523-.137.883.883,0,0,1,.684.286.769.769,0,0,1,.137.759,1.374,1.374,0,0,1-.373.709,3.194,3.194,0,0,1-.647.523,3.277,3.277,0,0,1-.7.323,1.958,1.958,0,0,1-.572.112,1.984,1.984,0,0,1-.9-.187,2.381,2.381,0,0,1-.659-.485,3.585,3.585,0,0,1-.51-.684Q44.54-39.279,44.341-39.677ZM58.524-40.6q-.05.224-.112.46a1.924,1.924,0,0,1-.112.336l.124-.1a1.42,1.42,0,0,1,.871-.323.845.845,0,0,1,.672.286.8.8,0,0,1,.149.734,1.879,1.879,0,0,1-.423.771,3.342,3.342,0,0,1-1.008.684,2.561,2.561,0,0,1-.983.211,1.457,1.457,0,0,1-1.642-1.269,5.625,5.625,0,0,1-1.418.921A3.944,3.944,0,0,1,53-37.537a3.2,3.2,0,0,1-1.555-.336,2.343,2.343,0,0,1-.933-.908,3.057,3.057,0,0,1-.373-1.319,5.386,5.386,0,0,1,.149-1.592,7.767,7.767,0,0,1,.722-2.015A8,8,0,0,1,52.3-45.549a6.5,6.5,0,0,1,1.754-1.331,4.5,4.5,0,0,1,2.1-.51,2.286,2.286,0,0,1,1.568.547,1.455,1.455,0,0,1,.523-.411,1.423,1.423,0,0,1,.6-.137.963.963,0,0,1,.709.286.883.883,0,0,1,.162.858Zm-2.836-4.553a1.974,1.974,0,0,0-1.107.336,4.02,4.02,0,0,0-.921.846,5.243,5.243,0,0,0-.684,1.107,4.836,4.836,0,0,0-.373,1.145,3.677,3.677,0,0,0-.075.722,1.488,1.488,0,0,0,.124.622,1,1,0,0,0,.373.435,1.169,1.169,0,0,0,.647.162,2.209,2.209,0,0,0,1.057-.274,3.291,3.291,0,0,0,.908-.722,4.668,4.668,0,0,0,.684-1.02,4.8,4.8,0,0,0,.411-1.169,2.7,2.7,0,0,0-.037-1.53A.963.963,0,0,0,55.687-45.151Zm14.108,4.578q-.05.2-.1.411a2.45,2.45,0,0,1-.1.336,1.831,1.831,0,0,1,.51-.311,1.327,1.327,0,0,1,.46-.087.845.845,0,0,1,.672.286.8.8,0,0,1,.149.734,2.279,2.279,0,0,1-.4.771,2.659,2.659,0,0,1-1.033.709,3,3,0,0,1-.983.187,1.837,1.837,0,0,1-1.232-.373,1.537,1.537,0,0,1-.485-1.12,5.72,5.72,0,0,1-1.493,1.082A3.9,3.9,0,0,1,64-37.537a3.274,3.274,0,0,1-1.568-.336,2.242,2.242,0,0,1-.933-.908,3.17,3.17,0,0,1-.361-1.319,5.386,5.386,0,0,1,.149-1.592,7.521,7.521,0,0,1,.734-2.015,8.543,8.543,0,0,1,1.294-1.841,6.32,6.32,0,0,1,1.742-1.331,4.448,4.448,0,0,1,2.078-.51,1.767,1.767,0,0,1,1.617.846l1.443-6.768a1.331,1.331,0,0,1,.535-.834,1.479,1.479,0,0,1,.858-.286,1.036,1.036,0,0,1,.746.286.827.827,0,0,1,.174.834ZM66.66-45.151a1.974,1.974,0,0,0-1.107.336,4.02,4.02,0,0,0-.921.846,5.243,5.243,0,0,0-.684,1.107,4.837,4.837,0,0,0-.373,1.145A3.677,3.677,0,0,0,63.5-41a1.488,1.488,0,0,0,.124.622,1,1,0,0,0,.373.435,1.22,1.22,0,0,0,.672.162,2.111,2.111,0,0,0,1.07-.286,3.465,3.465,0,0,0,.9-.746,4.722,4.722,0,0,0,.672-1.02,4.985,4.985,0,0,0,.4-1.132,2.7,2.7,0,0,0-.037-1.53A.963.963,0,0,0,66.66-45.151Zm9.455,7.614a4.016,4.016,0,0,1-1.816-.386,3.291,3.291,0,0,1-1.244-1.057,3.756,3.756,0,0,1-.622-1.568,4.895,4.895,0,0,1,.075-1.891,6.711,6.711,0,0,1,.746-1.953,6.191,6.191,0,0,1,1.269-1.568A5.854,5.854,0,0,1,76.227-47a5.444,5.444,0,0,1,2.053-.386,4.608,4.608,0,0,1,1.742.286,2.959,2.959,0,0,1,1.107.746,2.155,2.155,0,0,1,.523,1.045,2.986,2.986,0,0,1-.012,1.182A3.583,3.583,0,0,1,81.166-43a4.132,4.132,0,0,1-.871,1,4.139,4.139,0,0,1-1.232.7,4.392,4.392,0,0,1-1.53.261,5.758,5.758,0,0,1-.634-.037,2.264,2.264,0,0,1-.61-.149.879.879,0,0,1-.423-.348.922.922,0,0,1-.075-.659,1.6,1.6,0,0,1,.473-.784,1.214,1.214,0,0,1,.871-.361,1.046,1.046,0,0,1,.473.1,1.345,1.345,0,0,0,.547.1,1.137,1.137,0,0,0,.821-.311,1.15,1.15,0,0,0,.373-.585.8.8,0,0,0-.249-.734,1.777,1.777,0,0,0-1.269-.336,2.724,2.724,0,0,0-1.966.8,3.745,3.745,0,0,0-1.07,1.916,2.517,2.517,0,0,0,.211,1.891,1.64,1.64,0,0,0,1.53.771,3.348,3.348,0,0,0,1.132-.174,3.919,3.919,0,0,0,1.057-.622,1.36,1.36,0,0,1,.871-.348.887.887,0,0,1,.7.311.855.855,0,0,1,.174.784,1.562,1.562,0,0,1-.174.411,2.065,2.065,0,0,1-.323.411,4.767,4.767,0,0,1-1.841,1.132A6.417,6.417,0,0,1,76.115-37.537Zm11.819-5.076,1.841,3.259a.673.673,0,0,1,.137.336.952.952,0,0,1-.037.336,1.432,1.432,0,0,1-.522.8,1.36,1.36,0,0,1-.871.348.85.85,0,0,1-.423-.112.894.894,0,0,1-.323-.311l-1.617-2.787L83.38-37.96a1.145,1.145,0,0,1-.485.336,1.482,1.482,0,0,1-.46.087.849.849,0,0,1-.7-.348.909.909,0,0,1-.174-.8,2.943,2.943,0,0,1,.112-.323,1.178,1.178,0,0,1,.261-.348l3.185-3.235-1.667-2.936a1.158,1.158,0,0,1-.05-.672A1.382,1.382,0,0,1,83.928-47a1.388,1.388,0,0,1,.871-.336.876.876,0,0,1,.411.112.867.867,0,0,1,.336.311l1.393,2.463,2.438-2.463a1.456,1.456,0,0,1,.46-.311,1.194,1.194,0,0,1,.46-.112.9.9,0,0,1,.734.361.92.92,0,0,1,.187.809,1.378,1.378,0,0,1-.4.647Z"
              transform="translate(-9.341 54.432)"
              stroke="none"
            />
          </S.LogoText>
        </g>
      </S.Svg>
    </S.Link>
  </Link>
);

export const OrderbookLogo = ({ light = false }) => (
  <S.OrderbookLogoWrapper
    width="192"
    height="45"
    viewBox="0 0 192 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    light={light}
  >
    <path
      d="M185 31.7153C185 33.4922 186.457 34.9492 188.234 34.9492C190.046 34.9492 191.503 33.4922 191.503 31.7153C191.503 29.9385 190.046 28.4814 188.234 28.4814C186.457 28.4814 185 29.9385 185 31.7153Z"
      fill="#E6007A"
      stroke="none"
    />
    <path
      d="M6.46775 22.3843C6.46775 16.6984 10.4479 13.9976 14.3214 13.9976C18.2305 13.9976 22.2107 16.6984 22.2107 22.3843C22.2107 28.0703 18.2305 30.7711 14.3214 30.7711C10.4479 30.7711 6.46775 28.0703 6.46775 22.3843ZM1.38595 22.4199C1.38595 30.5223 7.49832 35.5331 14.3214 35.5331C21.1801 35.5331 27.2925 30.5223 27.2925 22.4199C27.2925 14.2819 21.1801 9.27116 14.3214 9.27116C7.49832 9.27116 1.38595 14.2819 1.38595 22.4199ZM41.8499 17.4447C41.4945 17.4091 41.1392 17.3736 40.7482 17.3736C39.2557 17.3736 36.8392 17.8001 35.7731 20.11V17.5158H31.1888V35H35.9152V27.0042C35.9152 23.2372 38.0119 22.0645 40.4284 22.0645C40.8549 22.0645 41.3168 22.1 41.8499 22.2067V17.4447ZM61.6679 9.27116H57.0126V19.2571C56.515 18.3331 55.0936 17.0893 52.0729 17.0893C47.1333 17.0893 43.6862 21.105 43.6862 26.2223C43.6862 31.5174 47.2399 35.4264 52.2151 35.4264C54.5605 35.4264 56.3374 34.3603 57.1192 32.9744C57.1192 33.7917 57.2258 34.6446 57.2969 35H61.8101C61.739 34.2893 61.6679 33.0099 61.6679 31.8372V9.27116ZM48.4481 26.2223C48.4481 23.0951 50.3671 21.3182 52.7837 21.3182C55.2002 21.3182 57.0836 23.0595 57.0836 26.1868C57.0836 29.3496 55.2002 31.1975 52.7837 31.1975C50.2961 31.1975 48.4481 29.3496 48.4481 26.2223ZM70.2424 24.2678C70.349 22.6686 71.6994 20.8207 74.1514 20.8207C76.8522 20.8207 77.9894 22.5265 78.0605 24.2678H70.2424ZM78.5225 28.8165C77.9539 30.3802 76.7456 31.4818 74.5423 31.4818C72.1969 31.4818 70.2424 29.8116 70.1357 27.5017H82.6448C82.6448 27.4306 82.7159 26.7199 82.7159 26.0447C82.7159 20.4298 79.482 16.9827 74.0804 16.9827C69.6027 16.9827 65.4804 20.6075 65.4804 26.1868C65.4804 32.086 69.7093 35.5331 74.5068 35.5331C78.8068 35.5331 81.5787 33.0099 82.4671 29.9893L78.5225 28.8165ZM97.0989 17.4447C96.7436 17.4091 96.3882 17.3736 95.9973 17.3736C94.5047 17.3736 92.0882 17.8001 91.0221 20.11V17.5158H86.4378V35H91.1643V27.0042C91.1643 23.2372 93.2609 22.0645 95.6775 22.0645C96.1039 22.0645 96.5659 22.1 97.0989 22.2067V17.4447ZM105.008 35V32.8678C105.932 34.3603 107.78 35.4264 110.196 35.4264C115.171 35.4264 118.441 31.4818 118.441 26.1868C118.441 20.9984 115.491 17.0538 110.374 17.0538C107.78 17.0538 105.861 18.191 105.079 19.4348V9.27116H100.424V35H105.008ZM113.714 26.2223C113.714 29.4207 111.795 31.1975 109.379 31.1975C106.998 31.1975 105.008 29.3851 105.008 26.2223C105.008 23.024 106.998 21.2827 109.379 21.2827C111.795 21.2827 113.714 23.024 113.714 26.2223ZM130.037 31.2331C127.727 31.2331 125.595 29.5273 125.595 26.2579C125.595 22.9529 127.727 21.2827 130.037 21.2827C132.347 21.2827 134.479 22.9529 134.479 26.2579C134.479 29.5628 132.347 31.2331 130.037 31.2331ZM130.037 16.9827C124.813 16.9827 120.868 20.8562 120.868 26.2579C120.868 31.624 124.813 35.5331 130.037 35.5331C135.261 35.5331 139.205 31.624 139.205 26.2579C139.205 20.8562 135.261 16.9827 130.037 16.9827ZM150.79 31.2331C148.48 31.2331 146.348 29.5273 146.348 26.2579C146.348 22.9529 148.48 21.2827 150.79 21.2827C153.1 21.2827 155.232 22.9529 155.232 26.2579C155.232 29.5628 153.1 31.2331 150.79 31.2331ZM150.79 16.9827C145.566 16.9827 141.621 20.8562 141.621 26.2579C141.621 31.624 145.566 35.5331 150.79 35.5331C156.014 35.5331 159.958 31.624 159.958 26.2579C159.958 20.8562 156.014 16.9827 150.79 16.9827ZM180.64 17.5158H174.457L168.416 24.019V9.27116H163.689V35H168.416V30.3802L170.37 28.319L174.99 35H180.783L173.64 24.8719L180.64 17.5158Z"
      stroke="none"
    />
  </S.OrderbookLogoWrapper>
);

export const PolkadexIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M39.2003 35.1685V29.5685L29.6337 20.0018H24.0337L39.2003 35.1685Z" />
    <path d="M4.66723 39.3659H10.2L19.6005 30.0346L28.9338 39.3659H34.594L19.6005 24.4346L4.66723 39.3659Z" />
    <path d="M0 4.83154L0 10.4315L9.56665 19.9982H15.1666L0 4.83154Z" />
    <path d="M34.5341 0.634124H29.0013L19.6008 9.96544L10.2674 0.634124H4.6073L19.6008 15.5654L34.5341 0.634124Z" />
    <path
      d="M19.6437 22.5634C21.0859 22.5634 22.255 21.3942 22.255 19.9521C22.255 18.5099 21.0859 17.3408 19.6437 17.3408C18.2016 17.3408 17.0325 18.5099 17.0325 19.9521C17.0325 21.3942 18.2016 22.5634 19.6437 22.5634Z"
      fill="#E6007A"
    />
  </svg>
);

export const PolkadexLogo = () => (
  <svg
    width="189"
    height="38"
    viewBox="0 0 189 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M38.3867 32.8242V27.6172L29.4657 18.6172H24.0927L38.3867 32.8242Z" />
    <path d="M0.000922203 5.56241V10.7744L8.92192 19.7744H14.2949L0.000922203 5.56241Z" />
    <path d="M4.6875 0.000433922L9.8945 0.000433922L18.8945 8.92143L27.8175 0.000433922L33.2585 0.000433922L18.8995 14.2944L4.6875 0.000433922Z" />
    <path d="M5.56267 37.9483H10.7697L19.7697 29.0273L28.6927 37.9483H34.1387L19.7747 23.6543L5.56267 37.9483Z" />
    <path
      d="M185.894 21.8462C186.7 21.8072 187.476 22.1584 187.98 22.7905C188.485 23.4401 188.663 24.2865 188.462 25.0848C188.264 25.9958 187.752 26.8079 187.017 27.3791C186.324 27.9525 185.454 28.2672 184.555 28.2696C183.767 28.3148 183.004 27.9848 182.496 27.3791C182.002 26.7236 181.852 25.8699 182.094 25.0848C182.272 24.1854 182.753 23.3751 183.458 22.7905C184.126 22.1852 184.993 21.8489 185.894 21.8462Z"
      fill="#E6007A"
    />
    <path d="M176.028 20.1333L178.917 25.2912C179.036 25.4455 179.11 25.6291 179.132 25.8225C179.144 26.0017 179.124 26.1816 179.073 26.3538C178.951 26.8549 178.662 27.2993 178.253 27.6135C177.878 27.9547 177.393 28.1502 176.886 28.1649C176.653 28.1652 176.424 28.1042 176.222 27.9878C176.014 27.8699 175.839 27.7006 175.714 27.4959L173.176 23.0844L168.884 27.4938C168.681 27.7346 168.419 27.9178 168.123 28.0251C167.891 28.1093 167.647 28.1557 167.401 28.1627C166.969 28.168 166.561 27.9623 166.308 27.6114C166.024 27.2577 165.923 26.7913 166.034 26.3516C166.083 26.1777 166.142 26.0068 166.21 25.8397C166.312 25.632 166.451 25.4451 166.62 25.2884L171.618 20.1698L169.002 15.5238C168.872 15.1848 168.845 14.8149 168.924 14.4605C169.184 13.445 170.067 12.7132 171.111 12.6494C171.588 12.6664 172.026 12.9166 172.284 13.3191L174.471 17.2173L178.295 13.3191C178.502 13.1101 178.748 12.9431 179.018 12.8272C179.244 12.7201 179.49 12.6599 179.74 12.6501C180.194 12.6433 180.623 12.857 180.892 13.2237C181.186 13.5799 181.295 14.0544 181.185 14.5035C181.077 14.8965 180.86 15.2512 180.561 15.5274L176.028 20.1333Z" />
    <path d="M157.48 28.1651C156.495 28.1889 155.519 27.9799 154.63 27.5549C153.849 27.1705 153.178 26.5949 152.678 25.8815C152.17 25.1389 151.836 24.2905 151.701 23.4C151.547 22.4047 151.587 21.3889 151.819 20.4088C152.046 19.3237 152.441 18.2808 152.99 17.3179C153.514 16.3883 154.187 15.551 154.982 14.8393C155.772 14.1379 156.677 13.5784 157.657 13.1852C158.68 12.7744 159.773 12.5672 160.876 12.575C161.807 12.5469 162.736 12.7006 163.609 13.0275C164.271 13.283 164.865 13.6869 165.347 14.2083C165.766 14.6739 166.05 15.2461 166.166 15.8624C166.284 16.4811 166.277 17.1169 166.147 17.733C166.004 18.3687 165.753 18.975 165.405 19.5255C164.641 20.7679 163.476 21.7121 162.105 22.2027C161.335 22.4832 160.522 22.6233 159.703 22.6164C159.371 22.615 159.038 22.5951 158.708 22.5569C158.379 22.5234 158.057 22.444 157.75 22.321C157.476 22.2129 157.243 22.0197 157.087 21.7696C156.92 21.4483 156.879 21.0767 156.969 20.7264C157.091 20.2496 157.349 19.8186 157.711 19.486C158.07 19.1172 158.564 18.9102 159.078 18.9124C159.334 18.906 159.588 18.96 159.82 19.0702C160.092 19.1824 160.384 19.2361 160.678 19.2279C161.156 19.2441 161.62 19.0669 161.966 18.7361C162.251 18.4951 162.456 18.172 162.552 17.8104C162.627 17.3819 162.48 16.9442 162.161 16.6489C161.59 16.2224 160.877 16.0322 160.17 16.1177C159.014 16.1007 157.9 16.5554 157.085 17.3774C156.237 18.198 155.652 19.2538 155.406 20.4095C155.124 21.4124 155.243 22.4861 155.739 23.4022C156.246 24.2296 157.175 24.7008 158.14 24.621C158.744 24.6329 159.346 24.5398 159.918 24.3457C160.519 24.1072 161.079 23.775 161.577 23.3613C161.953 23.0202 162.438 22.8246 162.945 22.81C163.364 22.7997 163.766 22.9805 164.038 23.3018C164.327 23.6448 164.429 24.1089 164.311 24.5422C164.251 24.7709 164.159 24.9899 164.038 25.1925C163.896 25.4299 163.726 25.6484 163.53 25.8428C162.717 26.6547 161.728 27.268 160.64 27.6352C159.622 27.9807 158.555 28.1596 157.48 28.1651V28.1651Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M147.407 24.0122C147.459 23.7885 147.511 23.5718 147.563 23.3619L151.819 3.20258C151.976 2.7459 151.872 2.23942 151.546 1.88333C151.232 1.5808 150.809 1.41773 150.374 1.43092C149.889 1.43625 149.417 1.59453 149.027 1.88333C148.588 2.19868 148.288 2.67106 148.187 3.20258L145.924 13.9143C145.393 13.0294 144.415 12.5136 143.386 12.5757C142.25 12.5735 141.131 12.8508 140.126 13.383C139.099 13.92 138.174 14.6329 137.393 15.4895C136.591 16.3669 135.908 17.3467 135.362 18.4033C134.828 19.4058 134.441 20.4794 134.21 21.5917C134.008 22.4155 133.929 23.2649 133.976 24.1119C134.012 24.84 134.205 25.5516 134.542 26.1976C134.878 26.8101 135.387 27.3091 136.006 27.6316C136.769 28.0113 137.615 28.1939 138.466 28.1628C139.429 28.1693 140.379 27.9467 141.239 27.5133C142.107 27.0733 142.899 26.4948 143.582 25.8004C143.582 26.4707 143.857 27.1115 144.343 27.5721C144.894 27.997 145.58 28.2069 146.274 28.1628C146.801 28.1525 147.323 28.0531 147.817 27.8689C148.439 27.6298 148.995 27.2451 149.438 26.7468C149.721 26.3841 149.933 25.9704 150.062 25.5279C150.181 25.1258 150.093 24.6908 149.828 24.3664C149.564 24.0627 149.176 23.8962 148.774 23.914C148.527 23.9163 148.282 23.9629 148.051 24.0517C147.759 24.1706 147.489 24.3367 147.251 24.5435C147.315 24.3704 147.367 24.1928 147.407 24.0122ZM140.905 16.6517C141.418 16.3037 142.023 16.1186 142.642 16.1204V16.1168C143.349 16.0493 144.008 16.4848 144.224 17.1629C144.475 17.9477 144.495 18.7881 144.283 19.5842C144.147 20.2046 143.937 20.8064 143.658 21.3766C143.378 21.9585 143.023 22.5015 142.604 22.992C142.205 23.4624 141.73 23.8617 141.198 24.1728C140.689 24.4715 140.109 24.6278 139.519 24.6253C139.15 24.6442 138.784 24.5552 138.465 24.3693C138.207 24.2016 138.003 23.9621 137.879 23.6803C137.744 23.3699 137.678 23.0342 137.684 22.6959C137.685 22.3122 137.725 21.9297 137.801 21.5537C137.921 20.928 138.117 20.3196 138.387 19.7426C138.671 19.1162 139.031 18.5276 139.46 17.9903C139.869 17.4713 140.356 17.0197 140.905 16.6517Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M129.698 24.051C129.764 23.8015 129.822 23.5587 129.874 23.3226L131.75 14.3883C131.909 13.9221 131.813 13.4064 131.496 13.0296C131.203 12.7306 130.8 12.5668 130.383 12.5772C130.059 12.5795 129.739 12.653 129.446 12.7923C129.127 12.9426 128.846 13.1652 128.627 13.4426C127.945 12.8539 127.066 12.5446 126.167 12.5765C125.017 12.5711 123.885 12.8483 122.867 13.3838C121.837 13.9237 120.906 14.6361 120.115 15.4903C119.305 16.3611 118.621 17.342 118.085 18.4041C117.563 19.4097 117.182 20.4826 116.952 21.5925C116.75 22.4163 116.671 23.2656 116.718 24.1127C116.754 24.8435 116.955 25.5567 117.304 26.1991C117.647 26.806 118.155 27.3031 118.768 27.6331C119.524 28.0143 120.363 28.1971 121.208 28.1643C122.096 28.1688 122.975 27.9808 123.784 27.613C124.595 27.2429 125.346 26.7517 126.01 26.1561C126.243 27.4944 127.101 28.1636 128.585 28.1636C129.116 28.1556 129.641 28.0415 130.127 27.8281C130.716 27.5675 131.252 27.2005 131.708 26.7454C132.022 26.3972 132.25 25.9796 132.372 25.5266C132.491 25.1245 132.404 24.6894 132.138 24.3651C131.874 24.0613 131.486 23.8948 131.084 23.9126C130.584 23.924 130.102 24.1044 129.717 24.4246L129.522 24.5823C129.597 24.411 129.656 24.2331 129.698 24.051ZM123.684 16.6482C124.197 16.3002 124.803 16.1151 125.422 16.1169L125.421 16.1205C126.127 16.0533 126.785 16.4867 127.003 17.163C127.254 17.9478 127.274 18.7882 127.062 19.5842C126.928 20.2263 126.712 20.8483 126.418 21.4348C126.133 22.0182 125.772 22.5613 125.345 23.0501C124.942 23.5126 124.459 23.8993 123.92 24.1923C123.412 24.4733 122.841 24.6212 122.261 24.6225C121.905 24.6383 121.552 24.5493 121.246 24.3665C120.988 24.1987 120.784 23.9593 120.66 23.6775C120.525 23.3671 120.459 23.0314 120.465 22.6931C120.466 22.3094 120.505 21.9268 120.582 21.5509C120.701 20.9252 120.898 20.3168 121.168 19.7398C121.452 19.1134 121.812 18.5248 122.241 17.9875C122.649 17.4683 123.136 17.0164 123.684 16.6482Z"
    />
    <path d="M107.619 24.7794C107.358 24.271 107.136 23.7437 106.955 23.202C106.747 22.6076 106.706 21.9674 106.837 21.3515C106.969 20.8233 107.28 20.3571 107.716 20.0322C108.242 19.6315 108.797 19.2697 109.375 18.9496C109.886 18.6645 110.342 18.2911 110.722 17.8469C111.022 17.5211 111.243 17.1302 111.366 16.7047C111.444 16.3109 111.145 16.1139 110.468 16.1139C109.932 16.1169 109.402 16.2238 108.906 16.4287C108.358 16.657 107.861 16.9915 107.442 17.4131C106.949 17.9091 106.528 18.4725 106.192 19.0865C105.788 19.831 105.504 20.6352 105.352 21.4691L104.337 26.3933C104.243 26.9426 103.925 27.4278 103.459 27.7319C103.048 28.0058 102.566 28.1552 102.072 28.1621C101.659 28.1741 101.258 28.0191 100.959 27.7319C100.641 27.3636 100.544 26.8528 100.705 26.3933L104.884 6.5494C105.019 5.75488 105.255 4.98095 105.586 4.24646C105.822 3.72348 106.162 3.25377 106.583 2.86555C106.958 2.53869 107.407 2.30877 107.891 2.19589C108.455 2.07045 109.031 2.01102 109.608 2.0188H109.959C110.392 1.98675 110.806 2.19952 111.032 2.57015C111.253 2.93546 111.329 3.37012 111.247 3.78902C111.12 4.24789 110.87 4.66319 110.524 4.98997C110.187 5.35478 109.713 5.56255 109.217 5.56355H108.865C108.787 5.56355 108.729 5.64218 108.689 5.79944C108.65 5.9567 108.605 6.15363 108.553 6.39023L106.757 14.7789C107.495 14.1247 108.323 13.5811 109.217 13.165C109.959 12.7991 110.771 12.5974 111.598 12.5735C112.641 12.5242 113.659 12.9089 114.409 13.6368C115.122 14.3784 115.376 15.4493 115.073 16.433C114.81 17.5894 114.237 18.6517 113.414 19.5045C112.588 20.4171 111.567 21.1304 110.427 21.5909C110.505 21.7219 110.622 21.9516 110.778 22.28C110.934 22.6083 111.097 22.9429 111.266 23.2837C111.416 23.5936 111.593 23.89 111.793 24.1699C111.975 24.4194 112.145 24.5442 112.301 24.5442C112.524 24.377 112.759 24.2258 113.004 24.0918C113.254 23.9506 113.536 23.8765 113.823 23.8767C114.23 23.8617 114.623 24.0272 114.896 24.3291C115.177 24.6621 115.259 25.1201 115.111 25.53C115.031 25.954 114.827 26.3445 114.525 26.6521C114.224 26.9709 113.883 27.2488 113.51 27.4788C113.167 27.6919 112.8 27.8638 112.417 27.9907C112.128 28.0946 111.825 28.1543 111.519 28.1678C111.033 28.1813 110.552 28.0804 110.113 27.8731C109.726 27.6791 109.376 27.4193 109.078 27.1053C108.769 26.7775 108.5 26.4141 108.277 26.0226C108.046 25.6135 107.826 25.199 107.619 24.7794Z" />
    <path d="M100.353 5.48601C100.275 5.48601 100.216 5.56464 100.177 5.7219L100.041 6.27326L96.4482 23.3611C96.3962 23.5709 96.3442 23.7877 96.2922 24.0114C96.253 24.192 96.2009 24.3695 96.1363 24.5427C96.349 24.3129 96.6086 24.1317 96.8974 24.0114C97.1281 23.9226 97.3728 23.876 97.6199 23.8737C98.032 23.8612 98.4298 24.0258 98.7129 24.3261C99.0052 24.6529 99.0951 25.1141 98.9469 25.5271C98.8643 25.956 98.661 26.3523 98.361 26.6692C97.9348 27.2044 97.3761 27.6185 96.7407 27.8702C96.2212 28.0598 95.6733 28.1597 95.1205 28.1656C94.2504 28.2541 93.3957 27.8899 92.8557 27.2005C92.4136 26.5571 92.3356 25.5005 92.6218 24.0307L96.3702 6.393C96.5031 5.60416 96.7393 4.83634 97.0727 4.10941C97.3119 3.59513 97.6503 3.13337 98.0684 2.75073C98.4495 2.41888 98.907 2.18727 99.3997 2.07677C99.9703 1.95206 100.553 1.89265 101.137 1.89968H101.449C101.879 1.88028 102.287 2.08994 102.522 2.45103C102.767 2.80676 102.845 3.25166 102.737 3.6699C102.626 4.1451 102.366 4.57219 101.995 4.88877C101.647 5.25276 101.17 5.46497 100.667 5.47956L100.353 5.48601Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M89.3444 14.8956C88.7825 14.1746 88.0604 13.5949 87.2356 13.2028C86.3205 12.7707 85.3184 12.5553 84.307 12.5733C83.2283 12.5755 82.1604 12.7893 81.1638 13.2028C79.1102 14.0391 77.3693 15.4985 76.1849 17.3764C75.5929 18.3051 75.1698 19.3317 74.9352 20.4085C74.702 21.3973 74.6889 22.4253 74.8966 23.4198C75.0877 24.3135 75.4745 25.1534 76.029 25.879C76.5883 26.5979 77.3115 27.1718 78.1378 27.5525C79.0433 27.9692 80.0302 28.1776 81.0264 28.1626C82.1165 28.1634 83.1968 27.9564 84.2097 27.5525C85.2307 27.1505 86.1803 26.5859 87.0217 25.8805C87.8645 25.1753 88.5951 24.3455 89.1885 23.4198C89.782 22.4995 90.2049 21.4794 90.4368 20.4085C90.6707 19.4128 90.6843 18.3779 90.4768 17.3764C90.2888 16.4751 89.9018 15.6275 89.3444 14.8956ZM81.8841 16.4507C82.4166 16.2302 82.9869 16.1162 83.563 16.1152C84.096 16.1068 85.1053 16.4507 85.1053 16.4507C85.1053 16.4507 85.9384 16.9825 86.2377 17.3764C86.5435 17.7826 86.7514 18.2542 86.845 18.7544C86.9486 19.3024 86.9352 19.8661 86.8043 20.4085C86.6722 20.9876 86.4405 21.5393 86.1197 22.0389C85.8009 22.5432 85.4058 22.9948 84.9487 23.3775C84.4977 23.7554 83.9909 24.0609 83.4464 24.283C82.914 24.5036 82.3436 24.6176 81.7675 24.6186L81.5941 24.6236C80.6142 24.6256 79.6834 24.1766 79.0735 23.3997C78.4395 22.541 78.2377 21.4366 78.527 20.4085L78.5902 20.1591C78.7283 19.6639 78.937 19.1907 79.2101 18.7544C79.5284 18.2379 79.9235 17.7732 80.3819 17.3764C80.8288 16.9877 81.3363 16.675 81.8841 16.4507Z"
    />
    <path d="M60.8776 21.5507H59.4719C58.9773 21.5968 58.493 21.3894 58.1843 20.9994C57.9219 20.62 57.8498 20.1402 57.989 19.7002C58.0873 19.2184 58.3412 18.7825 58.7115 18.4598C59.1171 18.0774 59.6571 17.8712 60.2137 17.8862H61.6201L63.0608 11.1954C63.1626 10.6386 63.4793 10.1445 63.9421 9.82021C64.3568 9.5186 64.8547 9.3535 65.3671 9.34772C65.7919 9.33991 66.2039 9.49361 66.5202 9.77791C66.8699 10.1608 66.9825 10.7047 66.8135 11.1954L65.3685 17.8891H66.7734C67.4418 17.8974 68.1029 17.7502 68.7049 17.4589C69.8631 16.8938 70.8081 15.9685 71.3989 14.8212C71.6913 14.262 71.9079 13.6662 72.0427 13.0495C72.1456 12.4915 72.1783 11.9228 72.14 11.3567C72.1091 10.8347 71.9694 10.325 71.7301 9.86036C71.4957 9.41407 71.1449 9.0399 70.715 8.77772C70.2052 8.4847 69.6234 8.34134 69.0361 8.36402H61.5808C61.0628 8.36645 60.5463 8.41928 60.0385 8.52176C59.5057 8.62654 58.9921 8.81248 58.5155 9.07312C58.0417 9.32912 57.6183 9.66923 57.2658 10.0769C56.9004 10.5124 56.6518 11.0341 56.5433 11.5926C56.4076 12.1493 56.4769 12.7364 56.7386 13.2459C56.9786 13.7118 57.2526 14.1592 57.5584 14.5846C57.9326 14.969 58.0805 15.5208 57.9489 16.0415C57.8339 16.5304 57.5675 16.9703 57.1878 17.2983C56.8141 17.6538 56.3181 17.8513 55.8029 17.8497C55.362 17.8508 54.9343 17.6988 54.5925 17.4195C53.8568 16.7269 53.3061 15.8604 52.9909 14.8993C52.6487 13.8299 52.5949 12.6888 52.8349 11.5919C53.0498 10.5331 53.4889 9.53281 54.1226 8.6587C54.7404 7.81239 55.4999 7.07979 56.3673 6.49342C57.2479 5.89885 58.2164 5.44711 59.2373 5.15482C60.252 4.85689 61.3038 4.70457 62.3612 4.7024H69.5862C70.7564 4.65939 71.9184 4.9155 72.9626 5.44663C73.8131 5.9002 74.5275 6.5729 75.0321 7.39538C75.52 8.21645 75.8137 9.13868 75.8905 10.0912C75.9807 11.1051 75.9214 12.1268 75.7146 13.1233C75.4691 14.2031 75.075 15.2434 74.5435 16.2143C74.0045 17.2149 73.3127 18.125 72.4934 18.9115C71.6552 19.711 70.6839 20.3572 69.6234 20.8209C68.4905 21.3146 67.2662 21.5628 66.0309 21.5493H64.626L64.2354 23.4013C64.0859 24.039 63.8701 24.6592 63.5916 25.2518C63.329 25.8137 62.9724 26.3263 62.5372 26.7675C62.0913 27.2114 61.56 27.5598 60.9756 27.7913C60.2842 28.0551 59.5484 28.1821 58.8088 28.1656C58.2069 28.1535 57.6093 28.0609 57.0319 27.8903C56.3482 27.6898 55.7853 27.2012 55.4896 26.5517C55.2642 26.2024 55.1805 25.7799 55.2557 25.3708C55.5345 24.3194 56.4746 23.5805 57.5598 23.5597C58.0367 23.5519 58.4932 23.7533 58.8095 24.1111C58.9712 24.3628 59.2519 24.5122 59.5506 24.5054C59.8301 24.4927 60.0754 24.315 60.1751 24.053C60.4233 23.4508 60.6065 22.8237 60.7216 22.1824L60.8776 21.5507Z" />
    <path
      d="M19.1875 21.4302C20.5682 21.4302 21.6875 20.3109 21.6875 18.9302C21.6875 17.5495 20.5682 16.4302 19.1875 16.4302C17.8068 16.4302 16.6875 17.5495 16.6875 18.9302C16.6875 20.3109 17.8068 21.4302 19.1875 21.4302Z"
      fill="#E6007A"
    />
  </svg>
);