/* eslint-disable react/prop-types */
const Text = ({ title , weigth , size , color }) => {
  return (
    <>
        <p style={{fontSize:size , color:color , fontWeight:weigth}}>
            {title}
        </p>
    </>
  )
}

export default Text