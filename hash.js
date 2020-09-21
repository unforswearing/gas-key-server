function hash(toHash) {
  if (!toHash) throw new Error('There is no item to hash')
  function hash_(str, digestAlgorithm, charset) {
    charset = charset || Utilities.Charset.UTF_8;
    digestAlgorithm = digestAlgorithm || 'MD5';
    var digest = Utilities.computeDigest(Utilities.DigestAlgorithm[digestAlgorithm], str, charset);
    var __ = '';
    for (i = 0; i < digest.length; i++) {
      var bStr = (digest[i] < 0 ? digest[i] += 256 : digest[i]).toString(16);
      if (bStr.length == 1) bStr = '0' + bStr;
      __ += bStr;
    }
    return __;
  }
  
  return hash_(toHash)
}
