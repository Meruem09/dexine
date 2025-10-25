import gsap from "gsap";
export const Animate_curtain = () => {

    const curtain1 = document.getElementsByClassName('.curtain-1')
    const curtain2 = document.getElementsByClassName('.curtain-2')

    if(curtain1 && curtain2){
        const tl = gsap.timeline()

        tl.set([curtain1, curtain2], {
            yPercent: 0,
        }).to([curtain1, curtain2], {
            yPercent:100
        })
    }

}
