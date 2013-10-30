// (c) Copyright 2009 Akamai Technologies
// All Rights Reserved

if (typeof(imi_mid) != 'undefined' && imi_mid) { 
  var imi_url="//www.imiclk.com/cgi/r.cgi?m=3&mid=" + imi_mid;
  if (typeof(imi_ptid) != 'undefined' && imi_ptid) { imi_url=imi_url + "&ptid=" + imi_ptid; }
  if (typeof(imi_did)  != 'undefined' && imi_did)  { imi_url=imi_url + "&did="  + imi_did;  }
  if (typeof(imi_cid)  != 'undefined' && imi_cid)  { imi_url=imi_url + "&cid="  + imi_cid;  }
  if (typeof(imi_sale) != 'undefined' && imi_sale) { imi_url=imi_url + "&sale=" + imi_sale; }
  if (typeof(imi_tid)  != 'undefined' && imi_tid)  { imi_url=imi_url + "&tid="  + imi_tid;  }
  if (typeof(imi_tot)  != 'undefined' && imi_tot)  { imi_url=imi_url + "&tot="  + imi_tot;  }
  if (typeof(imi_zip)  != 'undefined' && imi_zip)  { imi_url=imi_url + "&zip="  + imi_zip;  }
  if (typeof(imi_muid) != 'undefined' && imi_muid) { imi_url=imi_url + "&muid=" + imi_muid; }

  document.write('<iframe' +
                 ' width="0"' +
                 ' height="0"' +
                 ' frameborder="0"' +
                 ' src="' + imi_url +
                 '" marginwidth="0"' +
                 ' marginheight="0"' +
                 ' vspace="0"' +
                 ' hspace="0"' +
                 ' allowtransparency="true"' +
                 ' scrolling="no">' +
                 '</iframe>');
}
