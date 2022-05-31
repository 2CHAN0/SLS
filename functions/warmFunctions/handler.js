module.exports.warmHandler = async (event, context, callback) => {
    logger.info("1. Info 내용입니다.");
    logger.debug("2. 디버그 내용입니다.");
    logger.verbose("3. Verbose 내용입니다.");
    // logger.log("4. Log 내용입니다.") //에러 발생
    return { result: 'Hello warm Lambda!'}
};
