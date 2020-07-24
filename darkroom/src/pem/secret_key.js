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
        public_key = `-----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA38EOr8BKgD+yoNYkUDBm
        LdXkeRtJhBwBESyqvgfqsc0VYP6Do8U2fUbR1O7tZoOXxBlvrv3ATNuldYjeBkgg
        2Lyy3/3klsnp4v0qd9Cy9KB1RBnmPdxn1M+pTZ/2DyaemKrMi/LVAfQIJm8VGA5l
        0W831mYZKGuebY7eMpXnf4cLCJleH3g+pCJD/76maRFeK0Q7iiVijbBJfDLsa2Bb
        sBgMnzfPtBHR81NIogc4DV4Z27Nkcz9JzZExQlgPnIWnX0b6TM1pjT1fPTpbUWWa
        Xk+5xpOow6/QJ6AUsPCDtvSF5LundGDa39+Rguh2KOBnyazDTjpZqeUgLnId943d
        aQIDAQAB
        -----END PUBLIC KEY-----`

        private_key = `-----BEGIN PRIVATE KEY-----
        MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDX56ZlHpHiJmAy
        fAQB6hRXrauXPxHi9UZjt1H5kLAdYLp1cXeWt1hHgzV5SLCkgs1NwQaB+xOCn27x
        lvhDGpeqbdsxr+S/7EJnyB09Ohq4ULMF8VgGOrGGUdN7AcMRwLWs7gRVfaf9KeWs
        /CpFx6Jj9lEJNVxPydfoLYWZTwbB41gJdI8bAEgOUd4f2RZD2WX0jDZGRAhrT5Bv
        JKojHDJcwqrUe0Z48XYvwFxPeJHEb/7h2LlxpVKqBM517V+sHFgwR/DY6tQ9UeeR
        UNfQObzwKkFBgLBR7/zkhnyVs4iL4HmFPJWwbaeQgy9CHStRPsZx6t/rQmQ/KN4N
        ANdsb+WJAgMBAAECggEAJunVj7wmxv/rrq2zezTZXcQrfSMc8i8K9MYBvF1boK/i
        a3B8AWoiOyFm7ekwDTaWEkGMDrlWFuDtehWfwVh1pX4PV7FAJWdLwLDMtFBYqIfC
        /Hs3Rkgl3vO4jh8PLY/yLqznkxEGyhZXEwqQA+urVSD8EhDQBoF2rJ4nyi34JdGj
        NRE8qmu6dQiQsNA+TMKNLwc3or4Jlhl/o80wsaI5p/wcibcrU8OL1KG03OwY/LOj
        zOXhTI+DI5KfWlX52yZ383txuLN8Hs7nx2lDw51T83kt/Bici36i9LdLlphwRak4
        2AFPFhwZnPmhRd7hjVxSOKsZK/NP30WqP1KohinWQQKBgQDvukW1T13BVlR+xCdK
        2HEyjZfHWGlmUFxUfJ6yLwooE/yKXv5BkQkqCEYh2AdM/+ziCYfsc4XBo8Vdz6pz
        IEzywEdozjpbXAM/vR1sk8h8liW8uEfCg3r+WpZgP/jamSYOo9e6MDprB7Yx6vxe
        tROgb0/71HF20i7ufMweqrhjjQKBgQDmj2lqqhOjvm0Umaif4PE3ygjVs+ho+Pyl
        Vgb0bK6IofDw6ZMaV4D4UdYWx4ZLFCsF8l+Tz2EGbK3SVHuHhrA070c+3vh+ubXZ
        XcH1JKpNxX2YGcR9BL5ebwPIdpWvz1Nfq69uistMorznKHwZERMk3JsGRCUyB4OR
        p64BpX2s7QKBgGLUPiyzHYm5F3hzUWePt4sJyIrMLheaBZZnEd2PevZu1uwMoXFS
        Y57Kbm9BajEaSQQevcSDE59y7sjv9eskY9Sn5EiWzIQheM1sH5dFjZ+fHsughSTx
        o2D844Wmmec0v/XFIgiGHW9GbJxDres1Z3P6r9S4DlbX67UyCcySwRV5AoGAbmfo
        bBqLkxLCO2YlmIHoIPYPav5e4b2xhh7+75cHsQgTT9oaBjg22zKdGYVsKpG61Hsv
        B6H77U6nohuwl8KIqKCYdmPhjRWzHibGlXR8VQeoT+iu7csSujfhEOKwZWMboqmd
        NYsjNUyMtwjs/Dfv+evmFIcXZLCycVJhggpUdzUCgYEAxZ+ajh5/o6N4Lfi0z6bS
        pdH9V+aMV11d8CcIvtK3xgAfvjc5pNDtYjvkqqhXzz71QD1fksZZER5GDOoF4+Bp
        RtYLpX2n2NSBnrbPGIX7fXeZBJ11WdN2qlA1hZIULCKtIRy5s/pxTZDmlhJjn/tG
        rMeMjemeR0hsE/ZB9DjN2pM=
        -----END PRIVATE KEY-----`

        break;
}
export default public_key;

export function getPrivateKey() {
    return private_key
}