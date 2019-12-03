let public_key, private_key

switch (process.env.NODE_ENV) {
    case 'development':
        public_key = `-----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoQ+Gnh1MjvZEASQnreu5
        7/+pfIqakP8Fzq/eE3C18eF0vrjxhU43/YgKZ4r2v8hO8DoMonELfKkbD2tdE54l
        MGMQlSkNtJgVtW0xLdoE9Oim1Qd3U/eyIXV2cJUYwZ9A/NiP2S3rk5aCasxtQGH8
        eAem9V+F7zsi5In5zukkSPIQaTkTEpB3zBhP84TuzkUQ27AHHhOdM2BwcR8JSx+b
        3gJNqF/xrDFPX4D08IXosxrI1TuihjkSBiHcZwCxEsYRIL8QQfMAlx1hIUHPe6ON
        ZV25siye6spq4yPpPfvKxnkiE9KMHm2TUqzyHw0JsTk/5RkV+Po8MdaTDyIhekVs
        2QIDAQAB
        -----END PUBLIC KEY-----`
        
        private_key = `-----BEGIN PRIVATE KEY-----
        MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDGPbGCBaRXvneK
        U5/AaIyt0pmbCIf0xPqVSIZtZs5y8CG12oEOVb2dxF/A3g9PbWvKY71qCiGrvNyz
        Xi2kHH60fAQykbI9zhUYW9w1rtnovdlIobW7BwjhsR0MtcsYa5lqv3dksYS+LY2d
        wH2wTVlj7O2QJaJxBaKkUtuKK9o3IhrxLtPqUHXQRd+4/lPccPNorl1PAQl4J7Y4
        Q8FDzMnFU7K7eD/Jmt8ICGK6/cRz0WR5EN1l4USOhyw7fT3IaaUAf1Gn0hazE7/a
        Ec96H67BtB9OGTNpYY6fYYhKPvMTETyYrE3swON6TuWw/3GEmcpmffTLSqJ4Ren4
        1UoDpETbAgMBAAECggEBAJnSHP4qqo569/6ZTIfbl+z4UL//Kp8+iMF0+PnCn8aH
        lWCqHyGkXfEhAruAkpiq6syr/7lcCyxa61Uyam/AvIAHCqrCam+SjMPN41y0Q9lY
        FlVJRN3OY5HcABJwrRpRw0UVM+sp4zo91njld6FpI0dp/BuxWA4itUSUFk1sIXJM
        4kK3jtUwZHFxOA7s3VC/PXHsaUofQiH2A7c5YrUZcZ0NZ+YuqBmoIOOY+baqEvKo
        ARRJPlx/hjVdimdzp1c9WAojaAd4KSm48jH6Zm1tU7lxnJUNZg7r3cfydTHOJ8X6
        kV9URcFIHPJ/dzwdN5TOPQvEJhNfTnO0LXnFe/xV5MECgYEA7fEH9Q3xj6hdD9mK
        2JAsgHYekjOoFwHm5zyKZScSBhV/5Ao4zBMyGNk2D53t8ppcXr5aEa7/nN2gkf1v
        GKCoZfxopcdF4RlK1vaV7DSIScOIWeyn45w6ZyeY94jFJnG4iVF7wXx165W3SkIm
        BSeBRzO16YE0QlOgfeEGZX7O2hkCgYEA1UlR7314M+91GRb74zdXpgdk3ZRoVJUu
        weiCCLurSR8MWNAvc6ux/8aVcb5Wy0f5OOVKtTZ1i/VER8blIeYQoRryWozMKS/a
        sOS1k+72vJ1TeIE6kGYaV/VbE1ePIu+qyAy+gg9x+3v6ptUkb0X4LvnUDnkzYjO8
        T9nuzP1nXRMCgYEAza7pvgALrK9Rov3edE5M6c8xphhZWWoffAxtZftcLT4wi6P6
        bQ6645gAj4dpxamB57SMj3TDKYq73vdBLfzTFTYYEBYuZeNDOod2GfVfSsRn/bQB
        fVPzeHBWXsQwCIeNicaSQDOii7+j7eE4lIQN0Mr2mZ9C2YMI3UfEC8COdyECgYEA
        0JmaMlITmy/q5fQNvUdmSPLYWsKIW5lglrPxYdsyhhyAteg/ULEvMQqnJQzU1JJ7
        FINlUuCFjLH/6veDKGlcAEVbnOYx02KDUBkP4jSISybP+X7iqVHDGB3Wyo8LZk7j
        SC72sDus7hpupna14MKdHkynctRlRfl1ht+N6B0619MCgYB1CV9RtRP0osdGc1Rc
        dhl4Mm6EQ3YBYg8/riIixMtkxPjd0hALkNEa0q7Sv3CANG5x8yu2TISvEgvathbh
        t1wncAWbBtP96bIy0ks1Xr7LY+nWcPzw1SpGboEne2eSMUss/o/zz6PCVd8IXlFU
        pov/GHjrrxgYS93KRfNmtJ1prw==
        -----END PRIVATE KEY-----`
        break;

    default:
        break;
}
export default public_key;

export function getPrivateKey() {
    return private_key
}